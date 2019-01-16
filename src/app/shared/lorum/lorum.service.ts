import { Injectable } from '@angular/core';
import { WORD_LIST } from './words';

@Injectable()
export class LorumService {

  constructor() { }

  private static words = WORD_LIST;

  public static RandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  public static RandomWord() {
    var words = this.words;
    return words[this.RandomInteger(0, words.length - 1)];
  };

  public static RandomSentence(lowerBound: number = 5, upperBound = 15) {
    var sentence = ''
      , bounds = { min: 0, max: this.RandomInteger(lowerBound, upperBound) };

    while (bounds.min < bounds.max) {
      sentence = sentence + ' ' + this.RandomWord();
      bounds.min = bounds.min + 1;
    }

    if (sentence.length) {
      sentence = sentence.slice(1);
      sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
    }

    return sentence;
  };

  public static RandomParagraph = function (lowerBound = 3, upperBound = 7, sentenceLowerBound = 5, sentenceUpperBound = 15) {
    var paragraph = ''
      , bounds = { min: 0, max: this.RandomInteger(lowerBound, upperBound) };

    while (bounds.min < bounds.max) {
      paragraph = paragraph + '. ' + this.RandomSentence(sentenceLowerBound, sentenceUpperBound);
      bounds.min = bounds.min + 1;
    }

    if (paragraph.length) {
      paragraph = paragraph.slice(2);
      paragraph = paragraph + '.';
    }

    return paragraph;
  }

  public static GenerateDocument(lowerBound = 2, upperBound = 5) {
    var doc = ''
      , bounds = { min: 0, max: this.RandomInteger(lowerBound, upperBound) };

    let first = true;
    while (bounds.min < bounds.max) {
      doc = doc + '<p>' + (first ? 'Lorem ipsum ' : "") + this.RandomParagraph() + '</p>';
      first = false;
      bounds.min = bounds.min + 1;
    }

    return doc;

  }
}