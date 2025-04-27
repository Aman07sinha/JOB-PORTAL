// import { Carousel, CarouselContent, CarouselItem, CarouselPrevious CarouselNext } from '@material-tailwind/react';
// import React from 'react';
// import { Button } from './button';
// // import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
// // import { Button } from './ui/button';
// // import { useDispatch } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// // import { setSearchedQuery } from '@/redux/jobSlice';

// const category = [
//     "Frontend Developer",
//     "Backend Developer",
//     "Data Science",
//     "Graphic Designer",
//     "FullStack Developer"
// ]

// const CategoryCarousel = () => {
//     // const dispatch = useDispatch();
//     // const navigate = useNavigate();
//     // const searchJobHandler = (query) => {
//     //     dispatch(setSearchedQuery(query));
//     //     navigate("/browse");
//     // }

//     return (
//         <div>
//             {/* <Carousel className="w-full max-w-xl mx-auto my-20">
//                 <CarouselContent>
//                     {
//                         category.map((cat, index) => (
//                             <CarouselItem className="md:basis-1/2 lg-basis-1/3">
//                                 <Button onClick={()=>searchJobHandler(cat)} variant="outline" className="rounded-full">{cat}</Button>
//                             </CarouselItem>
//                         ))
//                     }
//                 </CarouselContent>
//                 <CarouselPrevious />
//                 <CarouselNext />
//             </Carousel> */}
//             <Carousel className = "w-full max-w-xl mx-auto my-20">
//                 <CarouselContent>
//                     {
//                         category.map((cat, index) => {
//                             <CarouselItem className = "md:basis-1/2 lg-basis-1/3">
//                                 <Button variant = "outline" className = "rounded-full">{cat}</Button>
//                             </CarouselItem>
//                         })
//                     }
//                 </CarouselContent>
//                 <CarouselPrevious/>
//                 <CarouselNext/>
//             </Carousel>
//         </div>
//     )
// }

// export default CategoryCarousel



// yaha se dusra 

// import React from 'react';
// import { Button } from './button'; // adjust the path if needed
// // import { useDispatch } from 'react-redux';
// // import { useNavigate } from 'react-router-dom';
// // import { setSearchedQuery } from '@/redux/jobSlice';

// const categories = [
//   "Frontend Developer",
//   "Backend Developer",
//   "Data Science",
//   "Graphic Designer",
//   "FullStack Developer"
// ];

// const CategoryCarousel = () => {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();

// //   const searchJobHandler = (query) => {
// //     dispatch(setSearchedQuery(query));
// //     navigate("/browse");
// //   };

//   return (
//     <div className="w-full max-w-5xl mx-auto mt-8 px-4">
//       <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2 px-1 scroll-smooth">
//         {categories.map((cat, index) => (
//           <Button
//             key={index}
//             // onClick={() => searchJobHandler(cat)}
//             className="min-w-max px-6 py-3 rounded-full bg-black text-white hover:bg-gray-800 whitespace-nowrap"
//           >
//             {cat}
//           </Button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryCarousel;


import React, { useRef } from 'react';
import { Button } from './button'; // Adjust this path as needed
import { ChevronLeft, ChevronRight } from 'lucide-react'; // You can use Heroicons or any icons

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
  "Mobile Developer",
  "DevOps Engineer",
  "QA Tester",
  "Product Manager"
];

const CategoryCarousel = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -200 : 200,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 px-4 relative">
      {/* Scroll Buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div
        ref={scrollRef}
        className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2 px-8 scroll-smooth"
      >
        {categories.map((cat, index) => (
          <Button
            key={index}
            className="min-w-max px-6 py-3 rounded-full bg-black text-white hover:bg-gray-800 whitespace-nowrap"
          >
            {cat}
          </Button>
        ))}
      </div>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CategoryCarousel;
