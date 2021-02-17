//LIVEDNSURLEXAMPLE http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site02/MyRoute
const BaseURL = "http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site02";

//IMAGES ON SERVER URLS PREFIX
export const PrefixPostsImagesUrl = `${BaseURL}/PostsImages/`;
export const PrefixRecommendationImagesUrl = `${BaseURL}/RecommendationImages/`;
export const PrefixProfileImageUrl = `${BaseURL}/ProfileImages/`;

//CountryController
export const GetAllCountries = `${BaseURL}/GetAllCountries`; // -GET
export const GetCountryById = `${BaseURL}/GetCountryById/`; // -GET add the ID
export const UpdateCountry = `${BaseURL}/UpdateCountry`; // -PUT
export const InsertNewCountry = `${BaseURL}/InsertNewCountry`; // -POST
export const DeleteCountry = `${BaseURL}/DeleteCountry/`; // -DELETE add the ID
export const CountryControllerURLS = {
  GetAllCountries,
  GetCountryById,
  UpdateCountry,
  InsertNewCountry,
  DeleteCountry,
};

//DestinationController
export const GetAllDestinations = `${BaseURL}/GetAllDestinations`; // -GET
export const GetDestinationId = `${BaseURL}/GetDestinationId/`; // -GET add the ID
export const InsertNewDestination = `${BaseURL}/InsertNewDestination`; // -POST
export const UpdateDestination = `${BaseURL}/UpdateDestination`; // -PUT
export const DeleteDestination = `${BaseURL}/DeleteDestination/`; // -DELETE add the ID
export const DestinationControllerURLS = {
  GetAllDestinations,
  GetDestinationId,
  InsertNewDestination,
  UpdateDestination,
  DeleteDestination,
};

//ImagesController
export const RecommendationImages = `${BaseURL}/api/Images/RecommendationImages`; // -POST
export const PostsImages = `${BaseURL}/api/Images/PostsImages`; // -POST
export const ImagesControllerURLS = {
  RecommendationImages,
  PostsImages,
};

//PostController
export const GetAllPosts = `${BaseURL}/GetAllPosts`; // -GET
export const GetPostById = `${BaseURL}/GetPostById/`; // -GET add the ID
export const GetAllPostOfPartners = `${BaseURL}/GetAllPostOfPartners`; // -GET INCLUDE USERS DATA
export const PostsOfPartnersByUserId = `${BaseURL}/PostsOfPartnersByUserId/`; // -GET INCLUDE USERS DATA add the ID
export const InsertNewPost = `${BaseURL}/InsertNewPost`; // -POST
export const UpdatePost = `${BaseURL}/UpdatePost`; // -PUT
export const DeletePost = `${BaseURL}/DeletePost/`; // -DELETE add the ID
export const PostsControllerURLS = {
  GetAllPosts,
  GetPostById,
  GetAllPostOfPartners,
  PostsOfPartnersByUserId,
  InsertNewPost,
  UpdatePost,
  DeletePost,
};

//RecommendationController
export const GetAllFullRecommendations = `${BaseURL}/GetAllFullRecommendations`; // -GET INCLUDE USERS DATA
export const GetAllFullRecommendationsById = `${BaseURL}/GetAllFullRecommendationsById/`; // -GET INCLUDE USERS DATA add the ID
export const GetRecommendationById = `${BaseURL}/GetRecommendationById/`; // -GET add the ID
export const InsertNewRecommendation = `${BaseURL}/InsertNewRecommendation`; // -POST
export const UpdateRecommendation = `${BaseURL}/UpdateRecommendation`; // -PUT
export const DeleteRecommendation = `${BaseURL}/DeleteRecommendation/`; // -DELETE add the ID
export const RecommendationControllerURLS = {
  GetAllFullRecommendations,
  GetAllFullRecommendationsById,
  GetRecommendationById,
  InsertNewRecommendation,
  UpdateRecommendation,
  DeleteRecommendation,
};

//TrackController
export const GetAllFullTracks = `${BaseURL}/GetAllFullTracks`; // -GET INCLUDE USERS DATA
export const GetAllFullTracksByUser = `${BaseURL}/GetAllFullTracksByUser/`; // -GET INCLUDE USERS DATA add the ID
export const GetAllFullTracksByDestination = `${BaseURL}/GetAllFullTracksByDestination/`; // -GET INCLUDE USERS DATA add the Destination ID
export const GetAllTracks = `${BaseURL}/GetAllTracks`; // -GET
export const GetTrackById = `${BaseURL}/GetTrackById/`; // -GET add the ID
export const InsertNewTrack = `${BaseURL}/InsertNewTrack`; // -POST
export const UpdateTrack = `${BaseURL}/UpdateTrack`; // -PUT
export const DeleteTrack = `${BaseURL}/DeleteTrack/`; // -DELETE add the ID
export const GetAllTracksLocationsData = `${BaseURL}/GetAllTracksLocationsData`; //- GET  get the locations latlangs
export const TracksControllerURLS = {
  GetAllFullTracks,
  GetAllFullTracksByUser,
  GetAllFullTracksByDestination,
  GetAllTracksLocationsData,
  GetAllTracks,
  GetTrackById,
  InsertNewTrack,
  UpdateTrack,
  DeleteTrack,
};

//UserController
export const GetAllUsers = `${BaseURL}/GetAllUsers`; // -GET
export const GetUserById = `${BaseURL}/GetUserById/`; // -GET add the ID
export const GetUserByEmailAndPassword = `${BaseURL}/GetUserByEmailAndPassword`; //GET add query string user and password
export const InsertNewUser = `${BaseURL}/InsertNewUser`; // -POST
export const UpdateUser = `${BaseURL}/UpdateUser`; // -PUT
export const DeleteUser = `${BaseURL}/DeleteUser/`; // -DELETE add the ID
export const UserControllerURLS = {
  GetAllUsers,
  GetUserById,
  GetUserByEmailAndPassword,
  InsertNewUser,
  UpdateUser,
  DeleteUser,
};

//SystemToolsController
export const UserForgotPassword = `${BaseURL}/UserForgotPassword`; // -POST MUST SEND ON BODY OBJECT WITH { string Email ,string Password ,string Key }
export const PasswordResetRequest = `${BaseURL}/PasswordResetRequest?email=`; //-GET add email or.haker95@gmail.com
