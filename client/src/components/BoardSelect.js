import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import BoardService from '../services/boardService';

const BoardSelect = ({ selection, setSelection, data, refetch }) => {
    const [token] = useLocalStorage('token');

    const toggleVisible = selection.visible
        ? { transform: 'translateX(0px)', zIndex: 5 }
        : { zIndex: -1 };
    return (
        <>
            <img
                className="position-absolute"
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
                    setSelection((prev) => {
                        return { ...prev, visible: !prev.visible };
                    });
                }}
                src="../assets/menuX32.png"
                alt="menu"
            ></img>
            <div className="sidebar position-absolute" style={toggleVisible}>
                <ul className="d-flex flex-column">
                    {data
                        ? data.map((board, i) => (
                              <li key={`${board.name + board.id}`}>
                                  <button
                                      href="#"
                                      onClick={() =>
                                          setSelection((prev) => {
                                              return {
                                                  ...prev,
                                                  selectedIndex: i
                                              };
                                          })
                                      }
                                  >
                                      {board.name}
                                  </button>
                              </li>
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
                    />
                    <button type="submit">Add a new board</button>
                </form>
            </div>
        </>
    );
};

export default BoardSelect;
