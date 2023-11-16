import { useSession } from "next-auth/react";
import { api } from "../../utils/api";
import Image from "next/image";
import {
	Table,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
	TableHeader,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { NextPage } from "next";

const Jury : NextPage = () => {
	const { data: sessionData } = useSession();
    const characters = ["Character 1","Character 2","Character 3","Character 4","Character 5","Character 6","Character 7"]
    return (
        <div className="container pt-20">
            <h1 className="text-extrabold mt-10 text-4xl pb-2">
                Judge Dashboard
            </h1>
            <div className="flex flex-row w-full m-2">
                <div className="flex basis-1/2 justify-start">
                    <Button>Select the College Code</Button>
                </div>
                <div className="flex basis-1/2 justify-end">
                    <Button>Remarks</Button>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="basis-4/5">
                    <Table>
                        <TableHeader>
                            <TableRow className="text-xl">
                                <TableHead>
                                    Character
                                </TableHead>
                                <TableHead>
                                    Criteria 1
                                </TableHead>
                                <TableHead>
                                    Criteria 2
                                </TableHead>
                                <TableHead>
                                    Criteria 3
                                </TableHead>
                                <TableHead>
                                    Total
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="text-xl">
                            {characters.map((character,i)=>(
                                <TableRow key={i}>
                                    <TableCell>
                                        {character}
                                    </TableCell>
                                    <TableCell>
                                        <input className="bg-transparent border text-center border-white w-24 rounded-lg"/>
                                    </TableCell>
                                    <TableCell>
                                        <input className="bg-transparent border text-center border-white w-24 rounded-lg"/>
                                    </TableCell>
                                    <TableCell>
                                        <input className="bg-transparent border text-center border-white w-24 rounded-lg"/>
                                    </TableCell>
                                    <TableCell>
                                        1
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="basis-1/5">
                    <Table className="flex flex-col text-2xl">
                        <TableHeader>
                            <TableRow className="text-2xl">
                                <TableHead>
                                    Team Score
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>Criteria 1</TableCell>
                                <TableCell>1</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Criteria 2</TableCell>
                                <TableCell>1</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Criteria 3</TableCell>
                                <TableCell>1</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Total</TableCell>
                                <TableCell>3</TableCell>
                            </TableRow>
                            <Button className="mt-4">
                                Submit
                            </Button>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default Jury;