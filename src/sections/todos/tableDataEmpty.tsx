import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";


export default async function TableEmpty() {

    return (<TableContainer component={Paper}   sx={{
        maxWidth: 800,
        mx: 'auto',
        my: 6,
        p: 2,
        borderRadius: 2,
        boxShadow: 3
    }} >
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell colSpan={6} style={{textAlign: 'center'}}>
                        No Todos available
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell colSpan={6} style={{textAlign: 'center'}}>
                        Please add some todos to get started.
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>)
}
