import React from "react";
import { ShoppingBag } from "lucide-react";

import { Star } from 'lucide-react';

type RatingCardProps = {
    rating: number,
    description?: string,
}

const Rating = ({rating}: {rating: number}) =>{
  return [1,2,3,4,5].map((index)=> (
        <Star
            key={index}
            color={index <= rating ? '#FFC107': "#E4E5E9"}
            className="w-4 h-4"
        />
  ))
}


const RatingCard = ({rating, description} :  RatingCardProps)=> {


return (<div
                className="flex items-center justify-between gap-3 px-5 py-7 border-b"
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-col justify-between gap-1">
                    <div className="flex text-sm items-center">
                      <Rating rating={rating} />
                    </div>
                  </div>
                </div>
                <div className="text-xs flex items-center">
                    <p>{description} 1</p>
                </div>
              </div>)
}

export default RatingCard