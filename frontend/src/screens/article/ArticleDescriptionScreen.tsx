import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {hp} from '../../helper/Metric';
import {useSelector} from 'react-redux';
import {Category} from '../../type';

const ArticleDescriptionScreen = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<Category[]>([]);
  const {categories} = useSelector((state: any) => state.article);

  const handleGenrePress = (genre: Category) => {
    if (isSelected(genre)) {
      setSelectedGenres(selectedGenres.filter(item => item.id !== genre.id));
    } else if (selectedGenres.length < 5) {
      // Check if the length of selected genres is less than 5
      setSelectedGenres([...selectedGenres, genre]); // Add the new genre to the selected genres array
    }
  };

  const isSelected = genre => selectedGenres.includes(genre);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Start Writing</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Article Title"
          value={title}
          onChangeText={setTitle}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Give a little description or overview"
          multiline
          numberOfLines={4}
          value={body}
          onChangeText={setBody}
        />
      </View>

      <View style={styles.captionContainer}>
        <Text style={styles.captionText}>
          Caption it (Choose Appropriate Tags for Engaging Articles)
        </Text>
      </View>

      <View style={styles.selectedGenresContainer}>
        {selectedGenres.map((genre, index) => (
          <Text key={index} style={styles.selectedGenreText}>
            #{genre.name}
          </Text>
        ))}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.genreContainer}>
        {categories.map((genre, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.genreButton,
              isSelected(genre) &&
                styles.selectedGenreButton &&
                styles.selectedGenreButton,
            ]}
            onPress={() => handleGenrePress(genre)}>
            <Text
              style={[
                styles.genreButtonText,
                isSelected(genre) && styles.selectedGenreButtonText,
              ]}>
              #{genre.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Related image</Text>
        <TextInput style={styles.input} placeholder="Upload one image" />
      </View>

      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  uploadButton: {
    padding: 8,
  },
  uploadButtonText: {
    fontSize: 24,
    color: '#000',
  },
  inputContainer: {
    padding: 16,
  },
  inputLabel: {
    fontSize: 20,

    fontWeight: '500',
    color: '#000',
    marginHorizontal: hp(1),
    marginBottom: 8,
  },
  input: {
    fontSize: 17,
    fontFamily: '600',
    borderWidth: 1,
    borderColor: 'black',
    padding: 8,
    textAlignVertical: 'top',
    borderRadius: 4,
    marginHorizontal: hp(1),
    marginBottom: 10,
  },
  errorContainer: {
    backgroundColor: '#fdd',
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 12,
    borderRadius: 4,
  },
  errorText: {
    color: '#c00',
  },
  captionContainer: {
    padding: 12,
    marginHorizontal: hp(1),
    marginBottom: 16,
  },
  captionText: {
    color: '#666',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 8,
  },
  checkboxCheck: {
    width: 16,
    height: 16,
    backgroundColor: '#007bff',
    borderRadius: 4,
  },
  checkboxLabel: {
    color: '#666',
  },
  genreContainer: {
    height: 80,

    padding: 16,
    flexDirection: 'row',
  },
  genreButton: {
    backgroundColor: '#f0f0f0',
    flex: 0,
    padding: 8,
    margin: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  genreButtonText: {
    color: '#666',
  },
  selectedGenreButton: {
    backgroundColor: '#007bff',
  },
  selectedGenreButtonText: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 16,
    margin: 16,
    borderRadius: 8,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedGenresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
  },
  selectedGenreItem: {
    backgroundColor: '#007bff',
    padding: 8,
    margin: 4,
    borderRadius: 4,
  },
  selectedGenreText: {
    color: '#000',
    marginHorizontal: hp(0.5),
  },
});

export default ArticleDescriptionScreen;
