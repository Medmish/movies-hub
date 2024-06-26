import { Pagination, ThemeProvider, createTheme } from "@mui/material"

const darkTheme=createTheme({
    palette:{
        mode:'dark',
    },
})

const CustomPagination = ({setPage,numOfPages=10}) =>{

    const handlePageChange =(page)=>{
        setPage(page);
        window.scroll(0,0);
    }
    return (
          <div
          style={{
            width:"100%",
            display:'flex',
            justifyContent:"center",
            marginTop:10,
             
          }}
          >
     <ThemeProvider theme={darkTheme}>
        <Pagination 
          count={numOfPages}  
        //   onChange={(e)=>handlePageChange(e.target.textContent)}
          onChange={(e, page) => handlePageChange(page)}
          hideNextButton
          hidePrevButton
          color="secondary"
          
        
        />
    </ThemeProvider>
    </div>
    )
}

export default CustomPagination