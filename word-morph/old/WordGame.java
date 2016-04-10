import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Queue;
import java.util.Scanner;
import java.util.Set;

/**
 * Program to find a way to change one word to another by only adding,
 * removing, or changing one letter at a time. All intermediate steps must be
 * valid words, however, the start and end words do not necessarily have to be
 * valid words. A list of valid words is read from a file.
 * @author Charles Haneberg
 */
public class WordGame
{
   /**
    * Main method.
    * @param args[0] path of a file containing a list of valid words. This file
    * can include duplicate words, so a book can be used.
    * @param args[1] word to start with
    * @param args[2] word to try to reach
    */
   public static void main(String[] args)
   {
      Iterable<String> resultList = null;
      
      try
      {
         // Call the wordGame function to compute the result
         resultList = wordGame(getWordSet(new FileInputStream(args[0])),
               args[1], args[2]);
      }
      catch (ArrayIndexOutOfBoundsException e)
      {
         // Thrown if there are not 3 args
         System.err.println("Must provide three arguments:\n"
               + "1. The path of a file containing a list of valid words (may "
               + "include duplicates)\n"
               + "2. Starting word\n"
               + "3. Word to try to get to");
         System.exit(1);
      }
      catch (FileNotFoundException e)
      {
         // Thrown if args[0] is not a valid file path
         System.err.println("File " + args[0] + " not found.");
         System.exit(1);
      }
      
      if (resultList != null)
      {
         // Print the list of words returned
         for (String resultWord : resultList)
         {
            System.out.println(resultWord);
         }
      }
      else
      {
         // The wordGame function returns null if there is no path between the
         // words
         System.out.println("There is no path from " + args[1] + " to "
               + args[2] + ".");
      }
   }
   
   /**
    * Finds the set of all unique words in an input stream.
    * @param input the input stream to find words in
    * @return the set of all unique words in the input stream
    */
   private static Set<String> getWordSet(InputStream input)
   {
      Set<String> wordSet = new HashSet<String>();

      Scanner inputScanner = new Scanner(input);
      
      // Go through the input, adding words to the set.
      while (inputScanner.hasNext())
      {
         wordSet.add(inputScanner.next());
      }

      inputScanner.close();

      return wordSet;
   }
   
   /**
    * Finds a way to change one word to another by only adding,
    * removing, or changing one letter at a time. All intermediate steps must be
    * valid words, however, the start and end words do not necessarily have to be
    * valid words.
    * @param validWords the set of valid words
    * @param startWord the word to start with
    * @param endWord the word to try to reach
    * @return a list (Deque) of words that are intermediate steps in changing
    * one word to another (including the start and end words).
    */
   private static Deque<String> wordGame(Set<String> validWords,
         String startWord, String endWord)
   {
      // Performs a breadth first search over the graph of words. Each valid
      // word is a node in this graph, and two words are adjacent if you can go
      // from one to the other by adding, removing, or changing a single
      // letter. A HashMap is kept which serves two purposes: it stores the set
      // of words visited or queued so that they are not visited or queued
      // again, and it stores as the associated value the "parent" word that
      // each word was reached from, so that the path taken to reach the
      // endWord can be reconstructed once the endWord is found. A queue is
      // used to store words to search.
      
      Map<String, String> wordsReached = new HashMap<String, String>();
      Queue<String> wordsToSearch = new ArrayDeque<String>();
      String currentWord;
      boolean found = false;
      Deque<String> result;
      
      // Add the start word to the search queue
      wordsToSearch.add(startWord);
      // Add the start word to the HashMap storing known words. Its associated
      // value is null because it was not reached from any other word.
      wordsReached.put(startWord, null);
      
      // loop while endWord has not been found and there are words left to
      // search
      while (!found && !wordsToSearch.isEmpty())
      {
         // The next word in the search queue will be searched
         currentWord = wordsToSearch.remove();
         
         //System.out.println(currentWord);
         
         // The adjacentWords function is used to find all words we can get to
         // from this one
         for(String adjacentWord : adjacentWords(currentWord))
         {
            // If the word we are looking for is adjacent, add it to the
            // HashMap and make found true.
            if (adjacentWord.equals(endWord))
            {
               wordsReached.put(adjacentWord, currentWord);
               found = true;
            }
            // If the adjacent word is a valid word and has not already been
            // reached, add it to the search queue and the HashMap.
            else if (validWords.contains(adjacentWord)
                  && !wordsReached.containsKey(adjacentWord))
            {
               wordsReached.put(adjacentWord, currentWord);
               wordsToSearch.add(adjacentWord);
            }
         }
      }
      
      // If the goal word was found, return a list of words in the path taken.
      if (found)
      {
         result = new ArrayDeque<String>();
         currentWord = endWord;
         
         // This loop goes backwards up the path that was discovered by using
         // the "word this word was reached from" information in the HashMap.
         // Each word is added to the beginning of a list.
         while (currentWord != null)
         {
            result.addFirst(currentWord);
            currentWord = wordsReached.get(currentWord);
         }
      }
      // If the goal word was not found, return null.
      else
      {
         result = null;
      }
      
      return result;
   }
   
   /**
    * Returns an Iterable of words that can be reached from a current word by
    * adding, removing, or changing one letter. The list contains invalid
    * words, and the current word itself.
    * @param currentWord word to find adjacent words of
    * @return Iterable of adjacent words
    */
   private static Iterable<String> adjacentWords(String currentWord)
   {
      List<String> result = new ArrayList<String>();
      
      String slice1;
      String slice2;
      
      // Words reached by removing a letter
      for (int i = 0; i < currentWord.length(); i++)
      {
         result.add(currentWord.substring(0, i)
               + currentWord.substring(i + 1));
      }
      
      // Words reached by changing a letter
      for (int i = 0; i < currentWord.length(); i++)
      {
         slice1 = currentWord.substring(0, i);
         slice2 = currentWord.substring(i + 1);
         
         for (char newLetter = 'a'; newLetter <= 'z'; newLetter++)
         {
            result.add(slice1 + newLetter + slice2);
         }
      }
      
      // Words reached by adding a letter
      for (int i = 0; i <= currentWord.length(); i++)
      {
         slice1 = currentWord.substring(0, i);
         slice2 = currentWord.substring(i);
         
         for (char newLetter = 'a'; newLetter <= 'z'; newLetter++)
         {
            result.add(slice1 + newLetter + slice2);
         }
      }
      
      return result;
   }
}