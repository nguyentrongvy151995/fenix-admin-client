import React from 'react';
import { useParams } from 'react-router-dom';
import Buttons from '../UiElements/Buttons';
import { useForm } from 'react-hook-form';

function AddRankSetting() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Add New
        </h2>
      </div>

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white">
            Season
          </label>
          <input
            {...register('season', { required: true })}
            type="text"
            placeholder="Season"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          {errors.season?.type === 'required' && (
            <p className="text-red-600 mt-2">This field is required</p>
          )}
        </div>

        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white">
            Tier Name
          </label>
          <input
            {...register('tierName', { required: true })}
            type="text"
            placeholder="Tier Name"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          {errors.tierName?.type === 'required' && (
            <p className="text-red-600 mt-2">This field is required</p>
          )}
        </div>

        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white">
            Medals
          </label>
          <input
            {...register('medals', { required: true })}
            type="text"
            placeholder="Season"
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
          {errors.medals && (
            <p className="text-red-600 mt-2">This field is required</p>
          )}
        </div>

        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
          <label className="mb-3 block text-black dark:text-white">
            RequiredCoins
          </label>
          <div className="flex gap-2">
            <div className="wrap-input">
              <input
                {...register('medals', { required: true })}
                type="text"
                placeholder="Season"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              {errors.medals && (
                <p className="text-red-600 mt-2">This field is required</p>
              )}
            </div>
            <div className="wrap-input">
              <input
                {...register('medals', { required: true })}
                type="text"
                placeholder="Season"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              {errors.medals && (
                <p className="text-red-600 mt-2">This field is required</p>
              )}
            </div>
            <div className="wrap-input">
              <input
                {...register('medals', { required: true })}
                type="text"
                placeholder="Season"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              />
              {errors.medals && (
                <p className="text-red-600 mt-2">This field is required</p>
              )}
            </div>
          </div>
          <a
            type="submit"
            className="mt-2 cursor-pointer inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >Add</a>
        </div>
      </div>

      {/* <a type='sumit' className="mt-2 cursor-pointer inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
        Submit
      </a> */}
      <input
        type="submit"
        className="mt-2 cursor-pointer inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      />
    </form>
  );
}

export default AddRankSetting;
