import { useForm } from 'react-hook-form';
import CardCollapse from 'src/components/CardCollapse';
import { useFieldArray } from 'react-hook-form';
import Input from 'src/components/Input';
import { getRules } from 'src/utils/rules';
import { inputCustom } from 'src/utils/common.css';
import matchSettingApi from 'src/apis/matchSetting.api';
import SelectOption from 'src/components/SelectOption';
import { toast } from 'react-hot-toast';
import { MESSAGE } from 'src/constants/message';
import { useContext, useEffect, useState } from 'react';
import rankTierApi from 'src/apis/rankTier.api';
import { useNavigate } from 'react-router-dom';
import { AppContext } from 'src/contexts/app.context';

const defaultValues = {
  tierId: '',
  round: [
    {
      roundNo: 1,
      roundName: '',
      roundType: 'WAITING',
      mainDuration: 1,
      challenges: {
        puzzleType: 'MATCH_CALCULATION',
      },
      preparationTimeBeforeMatch: 1,
      timeRemaining: 1,
      totalChests: 1,
      totalGoldRewards: 1,
      medalRates: [
        {
          position: 1,
          goldToCost: 1,
          receivedMedals: 1,
        },
      ],
    },
  ],
};

const ROUND_TYPE = [
  { name: 'WAITING', value: 'WAITING' },
  { name: 'PLAY_AROUND', value: 'PLAY_AROUND' },
  { name: 'PUZZLE', value: 'PUZZLE' },
  { name: 'TRADING', value: 'TRADING' },
];

export default function AddMatchSetting() {
  const { setLoading } = useContext(AppContext);

  const navigate = useNavigate();
  const [tierIds, setTierIds] = useState<any>();
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
    shouldFocusError: false,
  });
  const onSubmit = async (data: any) => {
    setLoading(true)
    const result = await matchSettingApi.postRankSettings(data);
    if (result) {
      toast.success(MESSAGE.CREATED_SUCCESS);
      navigate('/match-settings', { state: { status: true }, replace: true });
    }
    setLoading(false);
  };

  const getRankTiers = async () => {
    const data: any = await rankTierApi.getRankSettings();
    setTierIds(data.data.data);
  };

  useEffect(() => {
    getRankTiers();
  }, []);

  const handleAddRound = (e: any) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* start  */}
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-semibold text-title-md2 text-black dark:text-white">Add</h3>
          </div>
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-2.5 block text-black dark:text-white"></label>
                <SelectOption
                  label="Tier Name"
                  options={tierIds?.map(function (tierID: any) {
                    return { name: tierID.tierName, value: tierID._id };
                  })}
                  register={register}
                  name="tierId"
                  rules={getRules().RequiredCoinsItem}
                  errorMessage={errors.tierId?.message}
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

      <input
        className="flex justify-center rounded bg-primary py-3 w-40 font-medium text-gray mt-4"
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
            header={`Round ${index + 1}`}
            className="round_list border border-indigo-600"
            key={item.id}
            handleDelete={() => remove(index)}
          >
            <div className="px-2 py-2">
              <label className="mb-2.5 block text-black dark:text-white font-semibold">
                Round No: <span className="text-meta-1">*</span>
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
              <label className="mb-2.5 block text-black dark:text-white font-semibold">
                Round Name: <span className="text-meta-1">*</span>
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
              <label className="mb-2.5 block text-black dark:text-white font-semibold">
                Main Duration: <span className="text-meta-1">*</span>
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
              <SelectOption
                label="Challenges"
                options={[
                  { name: 'MATCH CALCULATION', value: 'MATCH_CALCULATION' },
                  { name: 'PICTURE PREDICTION', value: 'PICTURE_PREDICTION' },
                  { name: 'PICTURE PREDICTION', value: 'PICTURE_PREDICTION' },
                ]}
                register={register}
                name={`round[${index}].challenges.puzzleType`}
                rules={getRules().RequiredCoinsItem}
                errorMessage={errors.tierId?.puzzleType?.message}
              />
            </div>
            <div className="px-2 py-2">
              <label className="mb-2.5 block text-black dark:text-white font-semibold">
                Preparation TimeBefore Match:
              </label>
              <Input
                name={`round[${index}].preparationTimeBeforeMatch`}
                register={register}
                errorMessage={
                  Array.isArray(errors?.round) &&
                  errors.round[index]?.preparationTimeBeforeMatch?.message
                }
                className={inputCustom}
                placeholder="Preparation TimeBefore Match"
              />
            </div>
            <div className="px-2 py-2">
              <label className="mb-2.5 block text-black dark:text-white font-semibold">
                Time Remaining:
              </label>
              <Input
                type="number"
                name={`round[${index}].timeRemaining`}
                register={register}
                errorMessage={
                  Array.isArray(errors?.round) &&
                  errors.round[index]?.timeRemaining?.message
                }
                className={inputCustom}
                placeholder="Time Remaining"
              />
            </div>
            <div className="px-2 py-2">
              <label className="mb-2.5 block text-black dark:text-white font-semibold">
                Total Gold Rewards:
              </label>
              <Input
                type="number"
                name={`round[${index}].totalGoldRewards`}
                register={register}
                errorMessage={
                  Array.isArray(errors?.round) &&
                  errors.round[index]?.totalGoldRewards?.message
                }
                className={inputCustom}
                placeholder="Total Gold Rewards"
              />
            </div>
            <div className="px-2 py-2">
              <label className="mb-2.5 block text-black dark:text-white font-semibold">
                Total Chests:
              </label>
              <Input
                type="number"
                name={`round[${index}].totalChests`}
                register={register}
                errorMessage={
                  Array.isArray(errors?.round) &&
                  errors.round[index]?.totalChests?.message
                }
                className={inputCustom}
                placeholder="Total Chests"
              />
            </div>
            {/* <MedalRates /> */}
            <div className="border-2 my-5 border-stroke"></div>

            <MetaRates
              nestIndex={index}
              {...{ control, register }}
              errors={errors}
            />
          </CardCollapse>
        );
      })}
      <button
        className="flex mt-2 justify-center rounded bg-primary p-3 font-medium text-gray mb-2"
        onClick={() => append({})}
      >
        Add Round
      </button>
    </div>
  );
}

const MetaRates = ({ nestIndex, control, register, errors }: any) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `round[${nestIndex}].medalRates`,
  });
  useEffect(() => {
    remove(0);
  }, [])
  
  return (
    <>
      {fields.map((item: any, k) => {
        return (
          <CardCollapse
            key={item.id}
            header="medal Rates"
            handleDelete={() => remove(k)}
            className={'mx-6'}
          >
            <div className="px-2 py-2">
              <label className="mb-2.5 block text-black dark:text-white font-semibold">
                Position: <span className="text-meta-1">*</span>
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
              <label className="mb-2.5 block text-black dark:text-white font-semibold">
                Gold To Cost: <span className="text-meta-1">*</span>
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
              <label className="mb-2.5 block text-black dark:text-white font-semibold">
                Received Medals: <span className="text-meta-1">*</span>
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
        className="flex mt-2 justify-center rounded bg-primary p-3 font-medium text-gray mb-2 mx-6"
        onClick={() => append({})}
      >
        Add Metal Rate
      </button>
    </>
  );
};
