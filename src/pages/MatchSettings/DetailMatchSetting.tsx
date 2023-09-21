import { useForm } from 'react-hook-form';
import FieldArray from './fieldArray';
import CardCollapse from 'src/components/CardCollapse';
import { useFieldArray } from 'react-hook-form';
import Input from 'src/components/Input';
import { getRules } from 'src/utils/rules';
import { inputCustom } from 'src/utils/common.css';
import matchSettingApi from 'src/apis/matchSetting.api';
import SelectOption from 'src/components/SelectOption';
import { toast } from 'react-hot-toast';
import { MESSAGE } from 'src/constants/message';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ROUND_TYPE = [
  { name: 'WAITING', value: 'WAITING' },
  { name: 'PLAY_AROUND', value: 'PLAY_AROUND' },
  { name: 'PUZZLE', value: 'PUZZLE' },
  { name: 'TRADING', value: 'TRADING' },
];

export default function DetailMatchSetting() {
  const [matchSetting, setMatchSettings] = useState<any>();
  const params = useParams();
  const getMatchSetting = async () => {
    const data: any = await matchSettingApi.getRankSetting(params.id as string);
    setMatchSettings(data);
  };
  useEffect(() => {
    getMatchSetting();
  }, []);
  console.log('matchSetting', matchSetting);
  // if(!matchSetting) return;
  const defaultValues = {
    tierId: '23',
    round: [
      matchSetting?.rounds.map((round: any) => {
        return {
          roundNo: round.roundNo,
          roundName: round.roundName,
          roundType: round.roundType,
          mainDuration: round.mainDuration,
          challenges: round.challenges,
          preparationTimeBeforeMatch: round.preparationTimeBeforeMatch,
          timeRemaining: round.timeRemaining,
          totalChests: round.totalChests,
          medalRates: round.medalRates.map((medal: any) => {
            return {
              position: medal.position,
              goldToCost: medal.goldToCost,
              receivedMedals: medal.receivedMedals,
            };
          }),
        };
      }),
    ],
  };
  console.log('defaultValues', defaultValues);
  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    values: {
      tierId: matchSetting?.tierId,
      round: matchSetting?.rounds,
    },
    shouldFocusError: false,
  });
  console.log(errors);
  const onSubmit = async (data: any) => {
    console.log('data---', data);
    // const result = await matchSettingApi.postRankSettings(data);
    // console.log(result);
    // if (result) {
    //   toast.success(MESSAGE.CREATED_SUCCESS);
    // }
  };

  const handleAddRound = (e: any) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* start  */}
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Add</h3>
          </div>
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white"></label>
                <SelectOption
                  defaultV={matchSetting?.tierId}
                  label="Tier ID"
                  options={[
                    {
                      name: 'option1',
                      value: '6503b9a774333c32c3c33003',
                    },
                    {
                      name: 'option2',
                      value: '6503b9b974333c32c3c33006',
                    },
                  ]}
                  register={register}
                  name="tierId"
                  rules={getRules().RequiredCoinsItem}
                  // errorMessage={errors.tierId?.message}
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

function Round({ item, key, control, register, errors }: any) {
  const { fields, append, remove, prepend } = useFieldArray({
    control,
    name: 'round',
  });
  return (
    <div className="mb-4.5">
      {fields.map((item: any, index) => {
        return (
          <CardCollapse
            header="Rounds"
            className="round_list border border-indigo-600"
            key={item.id}
            handleDelete={() => remove(index)}
          >
            <div className="px-2 py-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Round No <span className="text-meta-1">*</span>
              </label>
              <Input
                name={`round[${index}].roundNo`}
                register={register}
                errorMessage={
                  Array.isArray(errors?.round) &&
                  errors.round[index]?.roundNo?.message
                }
                rules={getRules().roundNo}
                className={inputCustom}
                placeholder="Round No"
              />
            </div>

            <div className="px-2 py-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Name <span className="text-meta-1">*</span>
              </label>
              <Input
                name={`round[${index}].roundName`}
                register={register}
                errorMessage={
                  Array.isArray(errors?.round) &&
                  errors.round[index]?.roundName?.message
                }
                rules={getRules().RequiredCoinsItem}
                className={inputCustom}
                placeholder="Name"
              />
            </div>
            <div className="px-2 py-2">
              <SelectOption
                label="Round Type"
                options={ROUND_TYPE}
                defaultV={item.roundType}
                name={`round[${index}].roundType`}
                register={register}
                rules={getRules().RequiredCoinsItem}
                errorMessage={
                  Array.isArray(errors?.round) &&
                  errors.round[index]?.roundType?.message
                }
              />
            </div>
            <div className="px-2 py-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Main Duration <span className="text-meta-1">*</span>
              </label>
              <Input
                type="number"
                name={`round[${index}].mainDuration`}
                register={register}
                errorMessage={
                  Array.isArray(errors?.round) &&
                  errors.round[index]?.mainDuration?.message
                }
                rules={getRules().mainDuration}
                className={inputCustom}
                placeholder="Main Duration"
              />
            </div>
            <div className="px-2 py-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Challenges
                <span className="text-meta-1">*</span>
              </label>
              <Input
                name={`round[${index}].challenges`}
                register={register}
                errorMessage={
                  Array.isArray(errors?.round) &&
                  errors.round[index]?.challenges?.message
                }
                rules={getRules().preparationTimeBeforeMatch}
                className={inputCustom}
                placeholder="Challenges"
              />
            </div>
            <div className="px-2 py-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Preparation TimeBefore Match
                <span className="text-meta-1">*</span>
              </label>
              <Input
                name={`round[${index}].preparationTimeBeforeMatch`}
                register={register}
                errorMessage={
                  Array.isArray(errors?.round) &&
                  errors.round[index]?.preparationTimeBeforeMatch?.message
                }
                rules={getRules().preparationTimeBeforeMatch}
                className={inputCustom}
                placeholder="Preparation TimeBefore Match"
              />
            </div>
            <div className="px-2 py-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Time Remaining:
                <span className="text-meta-1">*</span>
              </label>
              <Input
                type="number"
                name={`round[${index}].timeRemaining`}
                register={register}
                errorMessage={
                  Array.isArray(errors?.round) &&
                  errors.round[index]?.timeRemaining?.message
                }
                rules={getRules().timeRemaining}
                className={inputCustom}
                placeholder="Time Remaining"
              />
            </div>
            <div className="px-2 py-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Total Gold Rewards:
                <span className="text-meta-1">*</span>
              </label>
              <Input
                type="number"
                name={`round[${index}].totalGoldRewards`}
                register={register}
                errorMessage={
                  Array.isArray(errors?.round) &&
                  errors.round[index]?.totalGoldRewards?.message
                }
                rules={getRules().RequiredCoinsItem}
                className={inputCustom}
                placeholder="Total Gold Rewards"
              />
            </div>
            <div className="px-2 py-2">
              <label className="mb-2.5 block text-black dark:text-white">
                Total Chests:
                <span className="text-meta-1">*</span>
              </label>
              <Input
                type="number"
                name={`round[${index}].totalGoldRewards`}
                register={register}
                errorMessage={
                  Array.isArray(errors?.round) &&
                  errors.round[index]?.totalGoldRewards?.message
                }
                rules={getRules().RequiredCoinsItem}
                className={inputCustom}
                placeholder="Total Chests"
              />
            </div>
            {/* <MedalRates /> */}
            <MetaRates
              nestIndex={index}
              {...{ control, register }}
              errors={errors}
            />
            <button type="button" onClick={() => remove(index)}>
              Delete Round
            </button>
          </CardCollapse>
        );
      })}
      <button
        className="flex mt-2 justify-center rounded bg-primary p-3 font-medium text-gray mb-2"
        onClick={() => append({})}
      >
        add round
      </button>
    </div>
  );
}

const MetaRates = ({ nestIndex, control, register, errors }: any) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `round[${nestIndex}].medalRates`,
  });
  return (
    <>
      {fields.map((item: any, k) => {
        return (
          <CardCollapse
            key={item.id}
            header="medalRates"
            handleDelete={() => remove(k)}
          >
            <div className="px-2 py-2">
              <label className="mb-2.5 block text-black dark:text-white">
                position:
                <span className="text-meta-1">*</span>
              </label>
              <Input
                name={`round[${nestIndex}].medalRates[${k}].position`}
                register={register}
                errorMessage={
                  Array.isArray(errors?.round) &&
                  Array.isArray(errors?.round[nestIndex]?.medalRates) &&
                  errors?.round[nestIndex]?.medalRates[k]?.position?.message
                }
                rules={getRules().position}
                className={inputCustom}
                placeholder="Position"
              />
            </div>
            <div className="px-2 py-2">
              <label className="mb-2.5 block text-black dark:text-white">
                goldToCost:
                <span className="text-meta-1">*</span>
              </label>
              <Input
                name={`round[${nestIndex}].medalRates[${k}].goldToCost`}
                register={register}
                errorMessage={
                  Array.isArray(errors?.round) &&
                  Array.isArray(errors?.round[nestIndex]?.medalRates) &&
                  errors?.round[nestIndex]?.medalRates[k]?.goldToCost?.message
                }
                rules={getRules().position}
                className={inputCustom}
                placeholder="GoldToCost"
              />
            </div>
            <div className="px-2 py-2">
              <label className="mb-2.5 block text-black dark:text-white">
                receivedMedals:
                <span className="text-meta-1">*</span>
              </label>
              <Input
                name={`round[${nestIndex}].medalRates[${k}].receivedMedals`}
                register={register}
                errorMessage={
                  Array.isArray(errors?.round) &&
                  Array.isArray(errors?.round[nestIndex]?.medalRates) &&
                  errors?.round[nestIndex]?.medalRates[k]?.receivedMedals
                    ?.message
                }
                rules={getRules().position}
                className={inputCustom}
                placeholder="Received Medals"
              />
            </div>
          </CardCollapse>
        );
      })}
      <button
        type="button"
        className="flex mt-2 justify-center rounded bg-primary p-3 font-medium text-gray mb-2"
        onClick={() => append({})}
      >
        Add MetalRates
      </button>
    </>
  );
};
