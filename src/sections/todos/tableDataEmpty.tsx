import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {getTranslations} from "next-intl/server";


export default async function TableEmpty() {
    const t = await getTranslations('Todos');

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
                        {t('generic.empty')}
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell colSpan={6} style={{textAlign: 'center'}}>
                        <Button variant={"contained"}>
                            {t('actions.add')}
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>)
}
