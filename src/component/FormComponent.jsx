import React from "react";
import { Loading } from "./Skeleton";

function FormComponent({
  categories,
  onSubmit,
  categoryEl,
  difficultyEl,
  typeEl,
  amountEl,
  loading,
  error,
}) {
  return (
    <form className="header" onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select id="category" ref={categoryEl}>
          <option value="any-category">Any Category</option>
          {categories.map((category) => {
            return (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="type">Question Type</label>
        <select id="type" ref={typeEl}>
          <option value="any-type">Any Type</option>
          <option value="boolean">True/False</option>
          <option value="multiple">Multiple Choice</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="difficulty">Difficulty</label>
        <select id="difficulty" ref={difficultyEl}>
          <option value="any-difficulty">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="amount">Number Of Questions</label>
        <input
          type="number"
          id="amount"
          min="1"
          step="1"
          max="50"
          defaultValue={10}
          ref={amountEl}
        />
      </div>
      <div className="form-group">
        <button className="btn" type="submit" disabled={loading || error}>
          {loading && <Loading />}
          {!loading && !error && "Generate"}
          {error && "• • •"}
        </button>
      </div>
    </form>
  );
}

export default FormComponent;
