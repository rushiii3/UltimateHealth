import {
  SafeAreaView,
  StyleSheet,
  View,
  BackHandler,
  Alert,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {PRIMARY_COLOR} from '../helper/Theme';
import AddIcon from '../components/AddIcon';
import ArticleCard from '../components/ArticleCard';
import HomeScreenHeader from '../components/HomeScreenHeader';
import {Categories, KEYS, retrieveItem} from '../helper/Utils';
import {ArticleData, Category, CategoryType, HomeScreenProps} from '../type';
import axios from 'axios';
import {ARTICLE_TAGS_API, BASE_URL} from '../helper/APIUtils';
import FilterModal from '../components/FilterModal';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useQuery} from '@tanstack/react-query';
import Loader from '../components/Loader';

const HomeScreen = ({navigation}: HomeScreenProps) => {
  const [articleCategories, setArticleCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [stateArticleData, setStateArticleData] = useState<ArticleData>([]);
  const [filterApplied, setFilterApplied] = useState(true); // Redux Variable
  const [sortingType, setSortingType] = useState<string>(''); // Redux Variable
  const [selectCategoryList, setSelectCategoryList] = useState<
    CategoryType['name'][]
  >([]); // Redux Variable

  const handleCategorySelection = (category: CategoryType['name']) => {
    console.log('Category clicked:', category);

    // Update Redux State
    setSelectCategoryList(prevList => {
      const updatedList = prevList.includes(category)
        ? prevList.filter(item => item !== category)
        : [...prevList, category];
      return updatedList;
    });
  };

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const getAllCategories = async () => {
    const token = await retrieveItem(KEYS.USER_TOKEN);
    if (token == null) {
      Alert.alert('No token found');
      return;
    }
    const {data: categoryData} = await axios.get(
      `${BASE_URL + ARTICLE_TAGS_API}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    setArticleCategories(categoryData);
    setSelectedCategory(categoryData[0]?.name);
  };
  useEffect(() => {
    getAllCategories();
    //setFilteredArticles(articles);
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      Alert.alert(
        'Warning',
        'Do you want to exit',
        [
          {text: 'No', onPress: () => null},
          {text: 'Yes', onPress: () => BackHandler.exitApp()},
        ],
        {cancelable: true},
      );
    });
    return unsubscribe;
  }, [navigation]);

  const handleNoteIconClick = () => {
    navigation.navigate('EditorScreen');
    //navigation.navigate('ArticleDescriptionScreen');
  };

  const handleCategoryClick = (category: CategoryType['name']) => {
    setSelectedCategory(category);
  };

  const renderItem = useCallback(({item}: {item: ArticleData}) => {
    return <ArticleCard item={item} navigation={navigation} />;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterReset = () => {

    // Update Redux State Variables
    setSelectCategoryList([]);
    setDate('');
  };

  const handleFilterApply = () => {

    // Update Redux State Variables
  };

  const {data: articleData, isLoading} = useQuery({
    queryKey: ['get-all-articles'],
    queryFn: async () => {
      try {
        const token = await retrieveItem(KEYS.USER_TOKEN);
        if (token == null) {
          Alert.alert('No token found');
          return;
        }
        const response = await axios.get(`${BASE_URL}/articles`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Article Res', response.data);
        return response.data.articles as ArticleData[];
      } catch (err) {
        console.error('Error fetching articles:', err);
      }
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <HomeScreenHeader handlePresentModalPress={handlePresentModalPress} />
      <FilterModal
        bottomSheetModalRef={bottomSheetModalRef}
        categories={articleCategories}
        handleCategorySelection={handleCategorySelection}
        selectCategoryList={selectCategoryList}
        handleFilterReset={handleFilterReset}
        handleFilterApply={handleFilterApply}
        setSortingType={setSortingType}
        sortingType={sortingType}
      />
      <View style={styles.buttonContainer}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {articleCategories?.map((item, index) => (
            <TouchableOpacity
              key={index}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.button,
                backgroundColor:
                  selectedCategory === item?.name ? 'white' : PRIMARY_COLOR,
                borderColor:
                  selectedCategory === item?.name ? PRIMARY_COLOR : 'white',
              }}
              onPress={() => {
                handleCategoryClick(item?.name);
              }}>
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  ...styles.labelStyle,
                  color: selectedCategory === item?.name ? 'black' : 'white',
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.articleContainer}>
        {articleData && (
          <FlatList
            data={articleData.filter(article =>
              article.tags.includes(selectedCategory),
            )}
            renderItem={renderItem}
            keyExtractor={item => item._id.toString()}
            contentContainerStyle={styles.flatListContentContainer}
          />
        )}
      </View>
      <View style={styles.homePlusIconview}>
        <AddIcon callback={handleNoteIconClick} />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 6,
  },
  button: {
    flex: 0,
    borderRadius: 14,
    marginHorizontal: 6,
    marginVertical: 4,
    padding: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyle: {
    fontWeight: 'bold',
    fontSize: 15,
    textTransform: 'capitalize',
  },
  articleContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 0,
    zIndex: -2,
  },
  flatListContentContainer: {
    paddingHorizontal: 16,
    marginTop: 10,
    paddingBottom: 120,
  },
  homePlusIconview: {
    bottom: 100,
    right: 25,
    position: 'absolute',
    zIndex: -2,
  },
});
