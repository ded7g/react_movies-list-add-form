import { useState } from 'react';
import { TextField } from '../TextField';

type MovieForm = {
  title: string;
  description: string;
  imgUrl: string;
  imdbUrl: string;
  imdbId: string;
};

const initialForm: MovieForm = {
  title: '',
  description: '',
  imgUrl: '',
  imdbUrl: '',
  imdbId: '',
};

type NewMovieProps = {
  onAdd: (movie: MovieForm) => void;
};

export const NewMovie = ({ onAdd }: NewMovieProps) => {
  const [form, setForm] = useState<MovieForm>(initialForm);
  const [count, setCount] = useState(0);
  const handleChange = (field: keyof MovieForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const requiredKeys: (keyof MovieForm)[] = [
      'title',
      'imgUrl',
      'imdbUrl',
      'imdbId',
    ];
    const allFilled = requiredKeys.every(key => form[key].trim() !== '');

    if (!allFilled) {
      return;
    }

    onAdd(form);
    setForm(initialForm);
    setCount(prev => prev + 1);
  };

  const fields: {
    name: keyof MovieForm;
    label?: string;
    required?: boolean;
  }[] = [
    { name: 'title', required: true, label: 'Title' },
    { name: 'description', label: 'Description' },
    { name: 'imgUrl', required: true, label: 'Image URL' },
    { name: 'imdbUrl', required: true, label: 'IMDB URL' },
    { name: 'imdbId', required: true, label: 'IMDB ID' },
  ];

  const requiredKeys: (keyof MovieForm)[] = [
    'title',
    'imgUrl',
    'imdbUrl',
    'imdbId',
  ];

  return (
    <form className="NewMovie" key={count} onSubmit={handleSubmit}>
      <h2 className="title">Add a movie</h2>

      {fields.map(({ name, label, required }) => (
        <TextField
          key={name}
          name={name}
          label={label}
          value={form[name]}
          required={required}
          onChange={value => handleChange(name, value)}
        />
      ))}

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            data-cy="submit-button"
            className="button is-link"
            disabled={!requiredKeys.every(k => form[k].trim() !== '')}
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
