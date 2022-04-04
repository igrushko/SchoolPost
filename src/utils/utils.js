export const isLiked = (likes=[]. currentUser_id) => {
 return likes.some((id) => id === currentUser._id);   
}
