import { img_300, unavailable } from "../../config/config"
import { Badge, Fade, Grow, Slide, Snackbar } from "@mui/material"
import "./SingleContent.css"
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ContentModal from "../ContentModal/ContentModal"
import { useEffect, useState } from "react";

const SingleContent =({ 
    id,
    poster,
    title,
    date,
    media_type,
    vote_average,
    isWatchlistPage,
    removeFromWatchlist
})=> {
    // const [displayModal, setDisplayModal] = useState(true);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    
    const addToWatchlist = async() => {
        setOpenSnackbar(true)
      
        const item = { id, poster, title, date, media_type, vote_average };
        const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        const itemIndex = watchlist.findIndex(watchedItem => watchedItem.id === item.id);
        if (isWatchlistPage) {
            setTimeout(() => {
                watchlist.splice(itemIndex, 1);
                localStorage.setItem('watchlist', JSON.stringify(watchlist));
                removeFromWatchlist(id);
            }, 800);
                
                // setIsAdded(false);
                 setSnackbarMessage("Removed from Watchlist");
            
        } else {
            if (itemIndex === -1) {
                watchlist.push(item);
                
                setSnackbarMessage("Added to Watchlist ☑️");
            } else {
                setSnackbarMessage("Already in Watchlist!");
            }
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
        }
       
    //    setWatchlistModified(!watchlistModified);
    };
  
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };
 // return(
    //   <ContentModal media_type={media_type} id={id} >
       
    //   <Badge 
    //     badgeContent={isWatchlistPage ? <RemoveCircleIcon    className="red"/> : <AddCircleIcon/>}
    //     style={{cursor:'pointer'}}
    //     onClick={addToWatchlist}
    //     className="badge-icon"
    //   />
       
    //       <img className="poster "src={poster ?`${img_300}/${poster}` : unavailable} alt={title}/>
    //        <div className="title">{title}</div>
          
    //        <div className="info" >
    //        <span className="subtitle">{media_type ==="tv" ? "TV Series" : "Movie"}</span>
    //        <span className="subtitle">{vote_average}⭐ </span>
    //        </div>

    //        <Snackbar
    //             anchorOrigin={{ vertical:"top",horizontal :"right"}} 
    //              sx={{ '& .MuiSnackbarContent-root': { backgroundColor: 'purple' } }}
    //             open={openSnackbar}
    //             autoHideDuration={2000}
    //             onClose={handleCloseSnackbar}
    //             message={snackbarMessage}
                
    //             // message={isWatchlistPage? "Removed from Watchlist " : isAdded ? "Added to watchlist ☑️" : "Already in watchlist !"}

    //             TransitionComponent={(props) => (
    //                 <Grow {...props} />
    //             )}
    //         />
    // </ContentModal>
    // // </> 
    // )

    return (
        <div >
            <Badge 
                badgeContent={isWatchlistPage ? <RemoveCircleIcon className="red"/> : <AddCircleIcon/>}
                style={{cursor:'pointer',position: 'absolute',marginTop: '13px'}}
                onClick={addToWatchlist}
                className="badge-icon"
                // sx={{ width: '40px', height: '40px' }}
            />
            { (
                <ContentModal media_type={media_type} id={id}>
                    <img className="poster" src={poster ? `${img_300}/${poster}` : unavailable} alt={title}/>
                    <div className="title">{title}</div>
                    <div className="info">
                        <span className="subtitle">{media_type === "tv" ? "TV Series" : "Movie"}</span>
                        <span className="subtitle">{vote_average ? vote_average.toFixed(1) : 'N/A'}⭐</span>
                    </div>
                </ContentModal>
            )}
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }} 
                sx={{ '& .MuiSnackbarContent-root': { backgroundColor: 'purple' } }}
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                TransitionComponent={Grow}
            />
        </div>
    );
}
export default SingleContent

