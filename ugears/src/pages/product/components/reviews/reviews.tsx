import Rating from "@components/rating";
import ReviewsStore from "@store/ReviewsStore";
import { useLocalStore } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import reviewsStyle from './reviews.module.scss'

const Reviews = () => {
    const { id } = useParams<{id: string}>();
    const reviewsStore = useLocalStore(() => new ReviewsStore());
    useEffect(() => {reviewsStore.getReviewsByProductId({id: id})}, []); 

    if(reviewsStore.list.length !== 0) return (
        <div className={reviewsStyle.reviews}>
            {
                reviewsStore.list.map((rev) => 
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
        </div>
    )
    return null
};

export default Reviews;
