import React, { useCallback, useEffect, useRef } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import BoardService from '../services/boardService';
import './BoardSelect.css';

const BoardSelect = ({
    showSideBar,
    setShowSideBar,
    setSelection,
    data,
    refetch
}) => {
    const [token] = useLocalStorage('token');
    const container = useRef();

    const handleClick = useCallback(
        (e) => {
            if (
                container.current &&
                !container.current.contains(e.target) &&
                !e.target.className.includes('board-options')
            ) {
                setShowSideBar(false);
            }
        },
        [setShowSideBar]
    );

    useEffect(() => {
        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [handleClick]);

    const toggleVisible = showSideBar
        ? { transform: 'translateX(0px)', zIndex: 5 }
        : { zIndex: -1 };

    return (
        <>
            <img
                className="position-absolute board-options"
                style={{
                    top: 5,
                    left: 5,
                    zIndex: 10,
                    display: 'visible',
                    cursor: 'pointer',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    padding: '3px',
                    borderRadius: '5%'
                }}
                onClick={() => {
                    setShowSideBar((prev) => !prev);
                }}
                src="../assets/menuX32.png"
                alt="menu"
            ></img>
            <div
                ref={container}
                className="sidebar position-absolute"
                style={toggleVisible}
            >
                <ul className="d-flex flex-column">
                    {data
                        ? data
                              .sort(
                                  (a, b) =>
                                      Date.parse(a.createdAt) -
                                      Date.parse(b.createdAt)
                              )
                              .map((board) => (
                                  <div
                                      key={`container-${board.name + board.id}`}
                                      className="board-selection"
                                  >
                                      <li key={`${board.name + board.id}`}>
                                          <button
                                              className="transparent-btn"
                                              onClick={() =>
                                                  setSelection(
                                                      (prev) => board.id
                                                  )
                                              }
                                          >
                                              {board.name}
                                          </button>
                                          <button
                                              key={`delete-${
                                                  board.name + board.id
                                              }`}
                                              onClick={async () => {
                                                  await BoardService.deleteBoard(
                                                      board.id,
                                                      token
                                                  );
                                                  refetch();
                                              }}
                                              className="board-btn"
                                          >
                                              X
                                          </button>
                                      </li>
                                  </div>
                              ))
                        : null}
                </ul>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        if (e.target[0].value.trim().length > 0 && token)
                            await BoardService.addBoard(
                                e.target[0].value.trim(),
                                token
                            );
                        e.target[0].value = '';
                        refetch();
                    }}
                >
                    <textarea
                        name="title"
                        placeholder="new board title..."
                        rows="1"
                        spellCheck={false}
                        onKeyDown={async (e) => {
                            if (e.key === 'Enter') {
                                if (e.target.value.trim().length > 0 && token)
                                    await BoardService.addBoard(
                                        e.target.value.trim(),
                                        token
                                    );
                                e.target.value = '';
                                refetch();
                            }
                        }}
                    />
                    <button className="transparent-btn" type="submit">
                        Add a new board
                    </button>
                </form>
            </div>
        </>
    );
};

export default BoardSelect;
