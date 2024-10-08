import type {CompositeScreenProps} from '@react-navigation/native';
import type {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import type {StackScreenProps} from '@react-navigation/stack';
import {RefObject} from 'react';
import {BottomSheetModal} from '@gorhom/bottom-sheet'; // Adjust this import based on your actual BottomSheetModal component

export type RootStackParamList = {
  SplashScreen: undefined;
  TabNavigation: undefined;
  LoginScreen: undefined;
  SignUpScreenFirst: undefined;
  SignUpScreenSecond: {user: UserDetail};
  OtpScreen: {email: string};
  NewPasswordScreen: {email: string};
  EditorScreen: {
    title: string;
    description: string;
    selectedGenres: Category[];
    imageUtils: string;
  };
  ArticleDescriptionScreen: undefined;
  PreviewScreen: {
    article: string,
    title: string,
    description: string,
    image: string,
    selectedGenres: Category[];
  };
  ArticleScreen: undefined;
  ProfileEditScreen: undefined;
};

export type UserDetail = {
  user_name: string;
  user_handle: string;
  email: string;
  password: string;
};
export type TabParamList = {
  Home: undefined;
  Podcasts: undefined;
  Profile: undefined;
};

export type SplashScreenProp =
  | StackScreenProps<RootStackParamList, 'SplashScreen'>
  | StackScreenProps<RootStackParamList, 'LoginScreen'>;

export type NewPasswordScreenProp = StackScreenProps<
  RootStackParamList,
  'NewPasswordScreen'
>;

export type OtpScreenProp = StackScreenProps<RootStackParamList, 'OtpScreen'>;

export type SignUpScreenFirstProp = StackScreenProps<
  RootStackParamList,
  'SignUpScreenFirst'
>;

export type SignUpScreenSecondProp = StackScreenProps<
  RootStackParamList,
  'SignUpScreenSecond'
>;

export type LoginScreenProp = StackScreenProps<
  RootStackParamList,
  'LoginScreen'
>;

export type ArticleScreenProp = StackScreenProps<
  RootStackParamList,
  'ArticleScreen'
>;

export type EditorScreenProp = StackScreenProps<
  RootStackParamList,
  'EditorScreen'
>;

export type PreviewScreenProp = StackScreenProps<
  RootStackParamList,
  'PreviewScreen'
>;

export type HomeScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Home'>,
  StackScreenProps<RootStackParamList, 'ArticleScreen'>
>;
export type PodcastScreenProps = BottomTabScreenProps<TabParamList, 'Podcasts'>;
export type ProfileScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'Profile'>,
  | StackScreenProps<RootStackParamList, 'ProfileEditScreen'>
  | StackScreenProps<RootStackParamList, 'ArticleScreen'>
>;

export type HomeScreenHeaderProps = {
  handlePresentModalPress: () => void;
  onTextInputChange: (textInput: string) => void;
};

export type ArticleCardProps = {
  item: ArticleData;
  navigation: HomeScreenProps['navigation'] | ProfileScreenProps['navigation'];
  success: () => void;
};

export type ProfileHeaderProps = {
  isDoctor: boolean;
  username: string;
  userhandle: string;
  profileImg: string;
  articlesPosted: number;
  articlesSaved: number;
  userPhoneNumber: string;
  userEmailID: string;
  specialization: string;
  experience: number;
  qualification: string;
  navigation: ProfileScreenProps['navigation'];
};

export type HomeScreenFilterModalProps = {
  bottomSheetModalRef: RefObject<BottomSheetModal>;
  categories: CategoryType[];
  handleCategorySelection: (category: CategoryType['name']) => void;
  selectCategoryList: CategoryType['name'][];
  handleFilterReset: () => void;
  handleFilterApply: () => void; // Replace `any` with the actual filter type if available
  setSortingType: (selectedType: string) => void;
  sortingType: string | '';
};

export type HomeScreenCategoriesFlatlistProps = {
  bottomSheetModalRef2: RefObject<BottomSheetModal>;
  categories: CategoryType[];
  handleCategorySelection: (category: CategoryType['name']) => void;
  selectCategoryList: CategoryType['name'][];
};

export type ProfileEditGeneralTab = {
  username: string;
  userhandle: string;
  email: string;
  about: string;
  imgUrl: string;
};

export type ProfileEditProfessionalTab = {
  specialization: string;
  qualification: string;
  years_of_experience: string;
};

export type ProfileEditContactTab = {
  phone_number: string;
  contact_email: string;
};

export type AddIconProp = {
  callback: () => void;
};

export type EmailInputModalProp = {
  visible: boolean;
  callback: (email: string) => void;
  backButtonClick: () => void;
  onDismiss: () => void;
};

export type Category = {
  __v: number;
  _id: string;
  id: number;
  name: string;
};

export type Article = {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string[];
  author_name: string;
  lastUpdatedAt: string;
  imageUtils: string;
};

export type ArticleData = {
  _id: string;
  title: string;
  authorName: string;
  authorId: string;
  content: string;
  summary: string;
  tags: string[];
  last_updated: string;
  imageUtils: string[];
  viewCount: number;
  likeCount: number;
  likedUsers: string[];
  savedUsers: string[];
};

export type CategoryType = {
  id: number;
  name: string;
};

export type User = {
  Profile_image: string;
  Years_of_experience: null;
  __v: number;
  _id: string;
  about: null;
  articles: any[];
  contact_detail: Contactdetail;
  created_at: string;
  email: string;
  followerCount: number;
  followers: any[];
  followingCount: number;
  followings: any[];
  isDoctor: boolean;
  isVerified: boolean;
  last_updated_at: string;
  likedArticles: any[];
  otp: null;
  otpExpires: null;
  password: string;
  qualification: null;
  readArticles: any[];
  savedArticles: any[];
  specialization: string | null;
  user_handle: string;
  user_id: string;
  user_name: string;
  verificationToken: null;
  refreshToken: null;
};

export type Contactdetail = {
  email_id: string;
  phone_no: string;
};

export type Podcast = {
  title: string;
  host: string;
  imageUri: string;
  likes: number;
  duration: string;
};

export type AuthData = {
  userId: string;
  token: string | null;
};
