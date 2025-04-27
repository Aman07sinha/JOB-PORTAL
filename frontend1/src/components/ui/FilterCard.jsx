import React from 'react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
// import { useDispatch } from 'react-redux'
// import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
  }
]

const FilterCard = () => {
  // const dispatch = useDispatch();
  // const [selectedValue, setSelectedValue] = useState('');
  // const changeHandler = (value) => {
  //   setSelectedValue(value);
  // };
  // useEffect(() => {
  //   dispatch(setSearchedQuery(selectedValue));
  // }, [selectedValue]);

  return (
    <div className='w-full bg-white p-3 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3 mb-4' />

      <RadioGroup className="space-y-4">
        {filterData.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h2 className='font-semibold text-md mb-2'>{section.filterType}</h2>
            {section.array.map((item, itemIndex) => {
              const itemId = `id-${sectionIndex}-${itemIndex}`;
              return (
                <div className='flex items-center space-x-2 mb-2' key={itemId}>
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
            <hr className='my-3' />
          </div>
        ))}
      </RadioGroup>
    </div>
  )
}

export default FilterCard;
