import Rating from "@components/rating";
import { ReviewModel } from "@store/models/Reviews";
import ReviewsStore from "@store/ReviewsStore";
import { observer, useLocalStore } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import reviewsStyle from './reviews.module.scss'

const Reviews = () => {
    const { id } = useParams<{id: string}>();
    const reviewsStore = useLocalStore(() => new ReviewsStore());
    useEffect(() => {reviewsStore.getReviewsByProductId({id: id})}, []); 

    const [allRev, setAllRev] = useState(1)
    // 1-больше трех отзывов, выводятся первые 3
    // 2-выводятся все отзывы
    
    const showRev = () => setAllRev(2);
    const hideRev = () => setAllRev(1);

    var reviews: ReviewModel[];
    if ((reviewsStore.list.length<3)||(allRev===2)) reviews = reviewsStore.list;
    else reviews = reviewsStore.list.slice(0,3);
console.log(allRev)
    if(reviewsStore.list.length !== 0) return (
        <div className={reviewsStyle.reviews}>
            {
                reviews.map((rev) => 
                    <div key={rev.userId} className={reviewsStyle.review}>
                        <div className={reviewsStyle.review__User}>
                            <Rating stars={rev.rating}/>
                            <div>{rev.userName}</div>
                            <div className={reviewsStyle.review__User__Date}>{rev.date}</div>
                        </div>
                        <div className={reviewsStyle.review__Text}>
                            <div>{rev.text}</div>
                        </div>
                    </div>
                )
            }
            {reviewsStore.list.length<3? null: allRev===1? 
            <div onClick={showRev} className={reviewsStyle.reviews__Link}>Показать все отзывы</div>: 
            <div onClick={hideRev} className={reviewsStyle.reviews__Link}>Скрыть отзывы</div>}
        </div>
    )
    return null
};

export default observer(Reviews);