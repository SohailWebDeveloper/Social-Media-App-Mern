import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import Comments from "./Comments";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
const Post = ({name}) => {
  const{uName,postpic,displayPic,postDescription}=name
  return (
    <div>
      {/* <Card sx={{ margin: 5 }}>
        <Link to={`/profile/${uName}`}>
        <CardHeader
          avatar={ displayPic ? <Avatar alt="Remy Sharp" src={displayPic} />:
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVert />
            </IconButton>
          }
          title={uName}
          subheader="September 14, 2022"
        />
        </Link>
       
        <CardMedia
          component="img"
          height="20%"
          image={postpic}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
           {postDescription}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
            />
          </IconButton>
       
          <Comments />
         
          <IconButton aria-label="share">
            <Share />
          </IconButton>
         
        </CardActions>
      
      </Card> */}
      <p>This is post</p>
    </div>
  );
};

export default Post;
