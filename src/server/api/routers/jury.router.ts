import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedJudgeProcedure, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";
import kalasangamaError from "~/utils/customError";
import { get } from "http";
import { Characters, Criteria } from "@prisma/client";

export const JuryRouter= createTRPCRouter({
            getTeams: protectedJudgeProcedure
            .query(async({ctx})=>{
                const userId = ctx.session.user.id;
                //check if judge exiists if not add to judge table
                const judge = await ctx.prisma.judge.upsert({
                    where:{
                        userId: userId
                    },
                    update: {
                        //nothing to update here
                    },
                    create:{
                        user: {
                            connect:{
                                id: userId
                            }
                        }
                    }
                })
                const teams = await ctx.prisma.team.findMany({
                    include:{
                        teamScore: true,
                        TeamNumber: true
                    }
                });
                return teams;
            }),
            addRemark: protectedJudgeProcedure
            .input((z.object({
                teamId:z.string(),
                remark:z.string(),
            })))
            .mutation(async({ctx,input})=>{
                const team = await ctx.prisma.team.findUnique({
                    where:{
                        id: input.teamId
                    }
                });
                if(!team){
                    throw new kalasangamaError("error","no team");
                }
                const teams = await ctx.prisma.team.update({
                    where:{
                        id: input.teamId
                    },
                    data:{
                        remark: input.remark,
                    }
                })
                return teams;
            }),
            getScores: protectedJudgeProcedure
            .input((z.object({
                teamId:z.string(),
            })))
            .query(async({ctx,input})=>{
                const userId = ctx.session.user.id;
                //check if judge exiists if not add to judge table
                const judge = await ctx.prisma.judge.upsert({
                    where:{
                        userId: userId
                    },
                    update: {
                        //nothing to update here
                    },
                    create:{
                        user: {
                            connect:{
                                id: userId
                            }
                        }
                    }
                })
                const scores = await ctx.prisma.individualScore.findMany({
                    where: {
                        teamID: input.teamId,
                        judgeId: ctx.session.user.id
                    },
                    include: {
                        criteria: true,
                        characterPlayed: true,
                        judge: {
                            include: {
                                teamScore: {
                                    where: {
                                        teamID: input.teamId,
                                        judgeId: ctx.session.user.id
                                    },
                                    include: {
                                        criteria: true,
                                    }
                                },
                                Submitted: {
                                    where: {
                                        teamID: input.teamId,
                                        judgeId: ctx.session.user.id
                                    }
                                }
                            }
                        },
                        team: {
                            include: {
                                college: true
                            }
                        }
                    }
                })
                return scores;
            }),
            updateScores: protectedJudgeProcedure
            .input((z.object({
                teamId: z.string(),
                criteriaName: z.nativeEnum(Criteria),
                characterId: z.nativeEnum(Characters),
                score : z.number().max(30),
            })))
            .mutation(async({ctx,input})=>{
                if(input.criteriaName === "CRITERIA_4" && input.score>10){
                    throw new kalasangamaError("EXCEEDING SCORE LIMIT", "Score should be with 0-10")
                }
                const userId = ctx.session.user.id;
                //check if criteria exists if not add it
                const criteria = await ctx.prisma.criteria.upsert({
                    where: {
                        name: input.criteriaName 
                    },
                    create: {
                        name: input.criteriaName 
                    },
                    update: {
                        //nothing to update
                    }
                });
                //check if team exists
                const team = await ctx.prisma.team.findUnique({
                    where: {
                        id: input.teamId 
                    }
                });
                //check if chacter exists if not add it
                const character = await ctx.prisma.characterOnUser.upsert({
                    where: {
                        character: input.characterId
                    },
                    create: {
                        character: input.characterId
                    },
                    update: {
                        //nothing to update
                    }
                });
                return await ctx.prisma.individualScore.upsert({
                    where: {
                        teamID_criteriaId_characterId_judgeId: {
                            criteriaId : criteria.id,
                            characterId : character.id,
                            teamID: input.teamId,
                            judgeId: userId
                        }
                    },
                    update: {
                        score: input.score
                    },
                    create: {
                        criteriaId : criteria.id,
                        characterId : character.id,
                        teamID: input.teamId,
                        score: input.score,
                        judgeId: userId
                    }
                });
            }),
            updateCriteriaScore: protectedJudgeProcedure
            .input((z.object({
                teamId: z.string(),
                criteriaName: z.nativeEnum(Criteria),
                score : z.number().max(30),
                final: z.boolean().optional()
            }))).mutation(async({ctx,input})=>{
                if(input.criteriaName === "CRITERIA_4" && input.score>10){
                    throw new kalasangamaError("EXCEEDING SCORE LIMIT", "Score should be with 0-10")
                }
                const userId = ctx.session.user.id;
                //check if criteria exists if not add it
                const criteria = await ctx.prisma.criteria.upsert({
                    where: {
                        name: input.criteriaName 
                    },
                    create: {
                        name: input.criteriaName 
                    },
                    update: {
                        //nothing to update
                    }
                });
                if(input?.final){
                    await ctx.prisma.submitted.upsert({
                        where: {
                            judgeId_teamID: {
                                judgeId: userId,
                                teamID: input.teamId
                            },
                        },
                        update: {
                            submitted: true
                        },
                        create: {
                            judgeId: userId,
                            teamID: input.teamId,
                            submitted: true
                        }
                    })
                }
                return await ctx.prisma.teamScore.upsert({
                    where:{
                        teamID_judgeId_criteriaId: {
                            criteriaId: criteria.id,
                            teamID: input.teamId,
                            judgeId: userId
                        }
                    },
                    create: {
                        criteriaId: criteria.id,
                        teamID: input.teamId,
                        score: input.score,
                        judgeId: userId
                    },
                    update: {
                        score: input.score
                    }
                })
            }),
            getRemark: protectedJudgeProcedure
            .input((z.object({
                teamId: z.string(),
            })))
            .query(async({ctx,input})=>{
                const userId = ctx.session.user.id;
                //check if judge exiists if not add to judge table
                const judge = await ctx.prisma.judge.upsert({
                    where:{
                        userId: userId
                    },
                    update: {
                        //nothing to update here
                    },
                    create:{
                        user: {
                            connect:{
                                id: userId
                            }
                        }
                    }
                })
                return await ctx.prisma.team.findUnique({
                    where: {
                        id: input.teamId
                    },
                    select: {
                        remark: true
                    }
                })
            })
        })


        

