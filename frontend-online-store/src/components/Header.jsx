import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <header>
        <div>
          <input
            type="text"
          />
          <button
            type="button"
          >
            Pesquisar
          </button>
        </div>
      </header>
    );
  }
}

export default Header;
