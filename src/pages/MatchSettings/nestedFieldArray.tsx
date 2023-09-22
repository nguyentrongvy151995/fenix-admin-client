import { useFieldArray } from 'react-hook-form';

export default ({ nestIndex, control, register } : any) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `test[${nestIndex}].nestedArray`,
  });

  return (
    <div>
      {fields.map((item: any, k) => {
        return (
          <div key={item.id} style={{ marginLeft: 20 }}>
            <label>Nested Array:</label>
            <input
              name={`test[${nestIndex}].nestedArray[${k}].field1`}
              {...register(`test[${nestIndex}].nestedArray[${k}].field1`, {
                required: true,
              })}
              defaultValue={item.field1}
              style={{ marginRight: '25px' }}
            />

            <input
              name={`test[${nestIndex}].nestedArray[${k}].field2`}
              {...register(`test[${nestIndex}].nestedArray[${k}].field2`)}
              defaultValue={item.field2}
            />
            <button type="button" onClick={() => remove(k)}>
              Delete Nested
            </button>
          </div>
        );
      })}

      <button
        type="button"
        className='block mx-2 my-2'
        onClick={() =>
          append({
            field1: 'field1',
            field2: 'field2',
          })
        }
      >
        Append Nested
      </button>

      <hr />
    </div>
  );
};
