import React, { MouseEventHandler } from 'react';
import { useFieldArray } from 'react-hook-form';
import NestedArray from './nestedFieldArray';
import CollapseTab from 'src/components/CollapseTab';
import CardCollapse from 'src/components/CardCollapse';

let renderCount = 0;

export default function Fields({
  control,
  register,
  setValue,
  getValues,
}: any) {
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: 'test',
  });

  renderCount++;
  console.log('fields', fields);
  const handleAddRound = (e: any) => {
    e.preventDefault();
    console.log('handle add');
  };
  return (
    <>
      <ul>
        {fields.map((item: any, index) => {
          return (
            <li key={item.id}>
              <input
                name={`test[${index}].name`}
                {...register(`test[${index}].name`)}
                defaultValue={item.name}
              />

              <button
                className="block mx-2 my-2"
                type="button"
                onClick={() => remove(index)}
              >
                Delete
              </button>
              <NestedArray nestIndex={index} {...{ control, register }} />
            </li>
          );
        })}
      </ul>

      <section>
        <button
          type="button"
          onClick={() => {
            append({ name: 'append' });
          }}
        >
          append
        </button>

        <button
          type="button"
          onClick={() => {
            setValue('test', [
              ...getValues().test,
              {
                name: 'append',
                nestedArray: [{ field1: 'append', field2: 'append' }],
              },
            ]);
          }}
        >
          Append Nested
        </button>

        <button
          type="button"
          onClick={() => {
            prepend({ name: 'append' });
          }}
        >
          prepend
        </button>

        <button
          type="button"
          onClick={() => {
            setValue('test', [
              {
                name: 'append',
                nestedArray: [{ field1: 'Prepend', field2: 'Prepend' }],
              },
              ...getValues().test,
            ]);
          }}
        >
          prepend Nested
        </button>
      </section>

      <span className="counter">Render Count: {renderCount}</span>

      <div className="flex flex-col gap-9">
        {/* <!-- Contact Form --> */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Contact Form
            </h3>
          </div>
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white">
                  Tier ID
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                    <option value="">Type your subject</option>
                    <option value="">USA</option>
                    <option value="">UK</option>
                    <option value="">Canada</option>
                  </select>
                  <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                    <svg
                      className="fill-current"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill=""
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            {fields.map((item: any, index) => {
              return <Round key={index} />
            })}
            <button onClick={handleAddRound}>Add Round</button>
          </div>
        </div>
      </div>
    </>
  );
}

function Round() {
  return (
    <div className="mb-4.5">
      <CardCollapse
        header="Rounds"
        className="round_list border border-indigo-600"
      >
        <div className="px-2 py-2">
          <label className="mb-2.5 block text-black dark:text-white">
            Name <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            placeholder="Round Name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="px-2 py-2">
          <label className="mb-2.5 block text-black dark:text-white">
            roundType <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            placeholder="Round Name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="px-2 py-2">
          <label className="mb-2.5 block text-black dark:text-white">
            mainDuration <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            placeholder="Round Name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="px-2 py-2">
          <label className="mb-2.5 block text-black dark:text-white">
            challenges <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            placeholder="Round Name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="px-2 py-2">
          <label className="mb-2.5 block text-black dark:text-white">
            preparationTimeBeforeMatch <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            placeholder="Round Name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="px-2 py-2">
          <label className="mb-2.5 block text-black dark:text-white">
            timeRemaining <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            placeholder="Round Name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="px-2 py-2">
          <label className="mb-2.5 block text-black dark:text-white">
            totalGoldRewards <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            placeholder="Round Name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="px-2 py-2">
          <label className="mb-2.5 block text-black dark:text-white">
            totalChests <span className="text-meta-1">*</span>
          </label>
          <input
            type="text"
            placeholder="Round Name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <MedalRates />
      </CardCollapse>
    </div>
  );
}

function MedalRates() {
  return (
    <CardCollapse
      header="medalRates"
      className="round_list border border-indigo-600"
    >
      <div className="px-2 py-2">
        <label className="mb-2.5 block text-black dark:text-white">
          roundNo <span className="text-meta-1">*</span>
        </label>
        <input
          type="text"
          placeholder="Round Name"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />
      </div>
      <div className="px-2 py-2">
        <label className="mb-2.5 block text-black dark:text-white">
          position <span className="text-meta-1">*</span>
        </label>
        <input
          type="text"
          placeholder="Round Name"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />
      </div>
      <div className="px-2 py-2">
        <label className="mb-2.5 block text-black dark:text-white">
          goldToCost <span className="text-meta-1">*</span>
        </label>
        <input
          type="text"
          placeholder="Round Name"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />
      </div>
      <div className="px-2 py-2">
        <label className="mb-2.5 block text-black dark:text-white">
          receivedMedals <span className="text-meta-1">*</span>
        </label>
        <input
          type="text"
          placeholder="Round Name"
          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
        />
      </div>
    </CardCollapse>
  );
}
