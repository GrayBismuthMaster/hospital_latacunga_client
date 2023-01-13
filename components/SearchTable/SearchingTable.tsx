
import { FC, useEffect, useState, useTransition } from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchBar from "material-ui-search-bar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    table: {
        minWidth: 650
    }
});
export const SearchingTable : FC<any> = (props) => { 
    
  //STATES DE LA TABLA
    const [rows, setRows] = useState<any>([]);

    const [keys, setKeys] = useState<any>([]);

    const [searched, setSearched] = useState("");

    const classes = useStyles();
  
    useEffect(() => {
      console.log("Entra siquiera")
        setRows(props.rows);
        setKeys(props.keys);
        console.log(props.keys);
        return () => {
          
        }
    }, [rows, keys])
      
    //METODOS DE BUSQUEDA DE LA TABLA
  
    const requestSearch = (searchedVal:any) => {
      const filteredRows = rows.filter((row:any) => {
        return row.name.toLowerCase().includes(searchedVal.toLowerCase());
      });
      setRows(filteredRows);
    };
  
    const cancelSearch = () => {
      setSearched("");
      requestSearch(searched);
    };
  
      return(
        <>
        <Paper>
          <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
          />
          <TableContainer>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {
                          keys.map((key:any)=>{
                            return (
                              <h1>A</h1>
                          )})
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        </>
      )
}
