import { useState } from 'react';
import PropTypes from 'prop-types';
import { RiSearchLine } from 'react-icons/ri';
import { Notify } from 'notiflix';
import { SearchbarHead, SearchForm, Input } from './Searchbar.styled';

export default function Searchbar({onSubmit}) {
  const [query, setQuery] = useState('');

const handleImageChange = event => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (query.trim() === '') {
      Notify.warning('Please enter a value', { position: 'center-center' });
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  return (
      <SearchbarHead>
        <SearchForm onSubmit={handleSubmit}>
          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={handleImageChange}
            value={query}
          />
          <button type="submit">
            <RiSearchLine />
          </button>
        </SearchForm>
      </SearchbarHead>
    );
}

Searchbar.propTypes = {
  handleSubmit: PropTypes.func,
  handleImageChange: PropTypes.func,
}

// export default class Searchbar extends Component {
//   state = {
//     query: '',
//   };

//   handleImageChange = event => {
//     this.setState({ query: event.currentTarget.value.toLowerCase() });
//   };

//   handleSubmit = event => {
//     event.preventDefault();

//     if (this.state.query.trim() === '') {
//       Notify.warning('Please enter a value', { position: 'center-center' });
//       return;
//     }
//     this.props.onSubmit(this.state.query);
//     this.setState({ query: '' });
//   };

//   render() {
//     const { handleSubmit, handleImageChange, state } = this;
//     return (
//       <SearchbarHead>
//         <SearchForm onSubmit={handleSubmit}>
//           <Input
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             onChange={handleImageChange}
//             value={state.query}
//           />
//           <button type="submit">
//             <RiSearchLine />
//           </button>
//         </SearchForm>
//       </SearchbarHead>
//     );
//   }
// }

