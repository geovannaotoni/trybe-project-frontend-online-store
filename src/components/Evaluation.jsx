import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../styles/Evaluation.css';
import { getEvaFromStorage, setEvaOnStorage } from '../services/localStorage';

class Evaluation extends Component {
  state = {
    email: '',
    text: '',
    rating: '',
    evaluationList: [],
    invalidFields: false,
  };

  componentDidMount() {
    const { id } = this.props;
    const evaluationList = getEvaFromStorage(id);
    this.setState({
      evaluationList,
    });
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
      invalidFields: false,
    });
  };

  handleClick = () => {
    const { id } = this.props;
    const { email, text, rating, evaluationList } = this.state;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const validationEmail = emailRegex.test(email);
    if (validationEmail && rating) {
      const evaluation = {
        email,
        text,
        rating,
      };
      const newEvaluationList = [...evaluationList, evaluation];
      this.setState({
        evaluationList: newEvaluationList,
        invalidFields: false,
        email: '',
        text: '',
        rating: '',
      });
      setEvaOnStorage(id, newEvaluationList);
    } else {
      this.setState({
        invalidFields: true,
      });
    }
  };

  render() {
    const { email, text, evaluationList, invalidFields } = this.state;
    return (
      <div>
        <input
          type="email"
          name="email"
          data-testid="product-detail-email"
          placeholder="Digite seu e-mail aqui"
          onChange={ this.handleChange }
          value={ email }
        />
        {/* https://uiverse.io/andrew-demchenk0/clever-elephant-35 */}
        <div className="rating">
          <input
            type="radio"
            id="star5"
            name="rating"
            value="5"
            data-testid="5-rating"
            onChange={ this.handleChange }
          />
          <label htmlFor="star5">★</label>
          <input
            type="radio"
            id="star4"
            name="rating"
            value="4"
            data-testid="4-rating"
            onChange={ this.handleChange }
          />
          <label htmlFor="star4">★</label>
          <input
            type="radio"
            id="star3"
            name="rating"
            value="3"
            data-testid="3-rating"
            onChange={ this.handleChange }
          />
          <label htmlFor="star3">★</label>
          <input
            type="radio"
            id="star2"
            name="rating"
            value="2"
            data-testid="2-rating"
            onChange={ this.handleChange }
          />
          <label htmlFor="star2">★</label>
          <input
            type="radio"
            id="star1"
            name="rating"
            value="1"
            data-testid="1-rating"
            onChange={ this.handleChange }
          />
          <label htmlFor="star1">★</label>
        </div>
        <textarea
          name="text"
          cols="30"
          rows="10"
          data-testid="product-detail-evaluation"
          onChange={ this.handleChange }
          value={ text }
        />
        <button
          data-testid="submit-review-btn"
          onClick={ this.handleClick }
        >
          Avaliar
        </button>
        <section>
          {invalidFields && <p data-testid="error-msg">Campos inválidos</p>}
          {
            evaluationList.map((evaluation, index) => (
              <article key={ index }>
                <p data-testid="review-card-email">{ evaluation.email }</p>
                <p data-testid="review-card-rating">{ evaluation.rating }</p>
                <p data-testid="review-card-evaluation">{ evaluation.text }</p>
              </article>
            ))
          }
        </section>
      </div>
    );
  }
}

Evaluation.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Evaluation;
