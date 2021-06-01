import React from 'react';

const BoardSelect = ({ selection, setSelection, data }) => {
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
                    cursor: 'pointer'
                }}
                onClick={() =>
                    setSelection((prev) => {
                        return { ...prev, visible: !prev.visible };
                    })
                }
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
            </div>
        </>
    );
};

export default BoardSelect;
