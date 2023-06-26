import cn from 'classnames';
import PropTypes from 'prop-types';

function Dropdown({
  onDelete, onRename, onClick, show = false,
}) {
  const dropdownClasses = cn('dropdown', { visible: show });

  return (
    <>
      <button
        type="button"
        onClick={(e) => onClick(e)}
        className="dropdown-icon"
      >
        <svg
          width="10"
          height="7"
          viewBox="0 0 10 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="1"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.83179 1.11001L4.76335 5.54369L0.694996 1.11001C0.539953 0.955178 0.288448 0.955178 0.133405 1.11001C-0.0218905 1.26489 -0.0218905 1.51589 0.133405 1.67072L4.4626 6.38869C4.54539 6.47128 4.65513 6.50652 4.76335 6.50094C4.87166 6.50652 4.98148 6.47128 5.06418 6.38869L9.39355 1.67072C9.54875 1.51589 9.54875 1.26489 9.39355 1.11001C9.23842 0.955178 8.98699 0.955178 8.83179 1.11001Z"
            fill="white"
          />
        </svg>
      </button>
      <div className={dropdownClasses}>
        <button type="button" onClick={(e) => onDelete(e)}>Удалить</button>
        <button type="button" onClick={(e) => onRename(e)}>Переименовать</button>
      </div>
    </>
  );
}

Dropdown.defaultProps = {
  show: false,
};

Dropdown.propTypes = {
  onRename: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  show: PropTypes.bool,
};

export default Dropdown;
