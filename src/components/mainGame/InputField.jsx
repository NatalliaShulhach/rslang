import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, IconButton } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import clsx from 'clsx';
import './InputField.scss';

const useStyles = makeStyles(() => ({
    root: {
        padding: 5,
        marginBottom: 0,
        fontSize: 24,
    },
    inputRoot: {
        fontSize: 24,
        marginTop: 0,
        textAlign: 'center',
        fontFamily: "'Roboto Mono', monospace",
    },
    input: {
        padding: '10px 7px 10px 7px',
    },
}));

const InputField = ({
    word,
    onGuessedWordProvided,
    isIncorrectPlaceHolderShown,
    wordStatus,
    isCorrectPlaceholderShown,
    handleNewWord,
    currentWordNumber,
    wordsType,
}) => {
    const [guessedWord, setGuessedWord] = useState('');
    const [isIncorrectStatusShown, setIsIncorrectStatusShown] = useState(false);
    const [isCorrectStatusShown, setIsCorrectStatusShown] = useState(false);
    const inputRef = useRef();
    const classes = useStyles();
    const wordWidth = word.length ? word.length * 17 : 200;

    useEffect(() => {
        setIsIncorrectStatusShown(false);
        setIsCorrectStatusShown(false);
        setGuessedWord('');
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        });
    }, [word, currentWordNumber, wordsType]);

    const onSubmit = (event) => {
        event.preventDefault();
        onGuessedWordProvided(guessedWord);
        event.target.reset();
    };

    const handleInputChanged = (event) => {
        setGuessedWord(event.target.value);
    };

    useEffect(() => {
        if (isIncorrectPlaceHolderShown) {
            setIsIncorrectStatusShown(true);
            setGuessedWord('');
        }
    }, [isIncorrectPlaceHolderShown]);

    useEffect(() => {
        if (isCorrectPlaceholderShown) {
            setIsCorrectStatusShown(true);
            setGuessedWord('');
        }
    }, [isCorrectPlaceholderShown]);

    useEffect(() => {
        setTimeout(() => {
            setIsIncorrectStatusShown(false);
        }, 1000);
    }, [isIncorrectStatusShown]);

    return (
        <form
            className="game-form"
            noValidate
            autoComplete="off"
            style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
            }}
            onSubmit={onSubmit}
        >
            <TextField
                classes={{ root: classes.root }}
                style={{
                    width: `${wordWidth}px`,
                }}
                name="guessedWord"
                autoComplete="off"
                variant="filled"
                placeholder={isIncorrectPlaceHolderShown ? word : ''}
                InputProps={{ classes: { root: classes.inputRoot, input: classes.input } }}
                onChange={handleInputChanged}
                disabled={isCorrectStatusShown}
                inputRef={inputRef}
                value={guessedWord}
            />
            <span
                className={clsx(
                    'correct-answer-hidden',
                    isIncorrectStatusShown && 'show',
                    isCorrectStatusShown && 'show'
                )}
            >
                {isIncorrectStatusShown &&
                    word &&
                    wordStatus.incorrectWord &&
                    word.split('').map((element, index) => {
                        return (
                            <span
                                key={`${element}_${index + 1}`}
                                className={clsx(
                                    'green-status',
                                    element !== wordStatus.incorrectWord[index] && 'red-status'
                                )}
                            >
                                {element}
                            </span>
                        );
                    })}
                {isCorrectStatusShown && word && <span className="correct-answer">{word}</span>}
            </span>
            {isCorrectStatusShown ? (
                <IconButton variant="contained" color="primary" onClick={handleNewWord}>
                    <ArrowForwardIosIcon fontSize="large" />
                </IconButton>
            ) : (
                <IconButton variant="contained" color="primary" type="submit">
                    <CheckIcon fontSize="large" />
                </IconButton>
            )}
        </form>
    );
};

InputField.propTypes = {
    word: PropTypes.string.isRequired,
    onGuessedWordProvided: PropTypes.func.isRequired,
    isIncorrectPlaceHolderShown: PropTypes.bool.isRequired,
    wordStatus: PropTypes.objectOf(PropTypes.string).isRequired,
    isCorrectPlaceholderShown: PropTypes.bool.isRequired,
    handleNewWord: PropTypes.func.isRequired,
    currentWordNumber: PropTypes.number.isRequired,
    wordsType: PropTypes.string.isRequired,
};

export default InputField;
