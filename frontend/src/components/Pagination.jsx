import ReactPaginate from 'react-paginate';
import styled from '@emotion/styled';

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: white;
  border-radius: 10px;
  margin-top: 20px;
  flex-wrap: wrap;
`;

const StyledReactPaginate = styled(ReactPaginate)`
  display: flex;
  list-style: none;
  padding: 0;

  li {
    margin: 0 5px;
    cursor: pointer;

    &.disabled {
      pointer-events: none;
      opacity: 0.5;
    }

    &.selected {
      font-weight: bold;
    }
  }

  a {
    padding: 8px 12px;
    background-color: #ff385c;
    color: white;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ff5773;
    }
  }
`;

const Pagination = ({ totalPages, onPageChange }) => (
  <PaginationContainer>
    <StyledReactPaginate
      pageCount={totalPages}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      onPageChange={(data) => onPageChange(data.selected + 1)}
      containerClassName={'pagination'}
      activeClassName={'selected'}
      previousLabel={'Previous'}
      nextLabel={'Next'}
      breakLabel={'...'}
    />
  </PaginationContainer>
);

export default Pagination;
