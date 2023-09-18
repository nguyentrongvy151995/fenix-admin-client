import { useForm } from 'react-hook-form';
import FieldArray from './fieldArray';
import CardCollapse from 'src/components/CardCollapse';
import { useFieldArray } from 'react-hook-form';
import Input from 'src/components/Input';
import { getRules } from 'src/utils/rules';
import { inputCustom } from 'src/utils/common.css';

const defaultValues = {
  tierID: 0,
  round: [
    {
      roundNo: 'useFieldArray1',
      roundName: '',
      roundType: '',
      mainDuration: 0,
      challenges: '',
      preparationTimeBeforeMatch: '',
      timeRemaining: 0,
      totalChests: 0,
      medalRates: [
        {
          position: 0,
          goldToCost: 0,
          receivedMedals: 0,
        },
      ],
    },
  ],
};

// const defaultValues = {
//   tierID: 0,
//   round: [
//     {
//       roundName: '',
//       medalRates: [
//         {
//           position: 0,
//         },
//       ],
//     },
//   ],
// };

export default function AddMatchSetting() {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues,
  });
  const onSubmit = (data: any) => console.log('data', data);

  const handleAddRound = (e: any) => {
    e.preventDefault();
    console.log('handle add');
  };
  console.log('error', errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <FieldArray
        {...{ control, register, defaultValues, getValues, setValue, errors }}
      /> */}

      {/* start  */}
      <div className="flex flex-col gap-9">
        {/* <!-- Contact Form --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Add</h3>
          </div>
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Tier ID
                </label>
                <Input
                  type="number"
                  register={register}
                  rules={getRules().RequiredCoinsItem}
                  name="tierID"
                  className={inputCustom}
                  errorMessage={errors.tierID?.message}
                />
              </div>
            </div>
            <Round
              {...{
                control,
                register,
                defaultValues,
                getValues,
                setValue,
                errors,
              }}
            />
            <button onClick={handleAddRound}>Add Round</button>
          </div>
        </div>
      </div>
      {/* end  */}

      <button
        className="lex w-full justify-center rounded bg-primary p-3 font-medium text-gray mb-2"
        type="button"
        onClick={() => reset(defaultValues)}
      >
        Reset
      </button>

      <input
        className="lex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
        type="submit"
      />
    </form>
  );
}

function Round({ item, key, control, register }: any) {
    const { fields, append, remove, prepend } = useFieldArray({
      control,
      name: 'round',
    });
    console.log(fields)
  return (
    <div className="mb-4.5">
      {fields.map((item: any, index) => {
        return (
          <CardCollapse
            header="Rounds"
            className="round_list border border-indigo-600"
            key={item.id}
          >
            <div className="px-2 py-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Name <span className="text-meta-1">*</span>
              </label>
              <input
                {...register(`round[${index}].roundName`)}
                type="text"
                placeholder="Round Name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
            </div>
            {/* <MedalRates /> */}
            <MetaRates nestIndex={index} {...{ control, register }} />
          </CardCollapse>
        );
      })}
      <button onClick={() => append({})}>add round</button>
    </div>
  );
}

// function MedalRates() {
//   return (
//     <CardCollapse
//       header="medalRates"
//       className="round_list border border-indigo-600"
//     >
//       <div className="px-2 py-2">
//         <label className="mb-2.5 block text-black dark:text-white">
//           roundNo <span className="text-meta-1">*</span>
//         </label>
//         <input
//           type="text"
//           placeholder="Round Name"
//           className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//         />
//       </div>
//       <div className="px-2 py-2">
//         <label className="mb-2.5 block text-black dark:text-white">
//           position <span className="text-meta-1">*</span>
//         </label>
//         <input
//           type="text"
//           placeholder="Round Name"
//           className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//         />
//       </div>
//       <div className="px-2 py-2">
//         <label className="mb-2.5 block text-black dark:text-white">
//           goldToCost <span className="text-meta-1">*</span>
//         </label>
//         <input
//           type="text"
//           placeholder="Round Name"
//           className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//         />
//       </div>
//       <div className="px-2 py-2">
//         <label className="mb-2.5 block text-black dark:text-white">
//           receivedMedals <span className="text-meta-1">*</span>
//         </label>
//         <input
//           type="text"
//           placeholder="Round Name"
//           className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
//         />
//       </div>
//     </CardCollapse>
//   );
// }

const MetaRates = ({ nestIndex, control, register }: any) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `round[${nestIndex}].medalRates`,
  });
  console.log('field2', fields);
  return (
    <CardCollapse header="metalRates">
      {fields.map((item: any, k) => {
        return (
          <div key={item.id}>
            <div>
              <label>position:</label>
              <input
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                name={`round[${nestIndex}].metaRates[${k}].position`}
                {...register(`round[${nestIndex}].metaRates[${k}].position`, {
                  required: true,
                })}
              />
            </div>

            {/* <div>
              <label>goldToCost</label>
              <input
                name={`round[${nestIndex}].metaRates[${k}].goldToCost`}
                {...register(`round[${nestIndex}].metaRates[${k}].goldToCost`, {
                  required: true,
                })}
              />
            </div>
            <div>
              <label>receivedMedals</label>
              <input
                name={`round[${nestIndex}].metaRates[${k}].receivedMedals`}
                {...register(
                  `round[${nestIndex}].metaRates[${k}].receivedMedals`,
                  {
                    required: true,
                  },
                )}
              />
            </div> */}
            <button type="button" onClick={() => remove(k)}>
              Delete Nested
            </button>
          </div>
        );
      })}

      <button
        type="button"
        className="block mx-2 my-2"
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
    </CardCollapse>
  );
};
