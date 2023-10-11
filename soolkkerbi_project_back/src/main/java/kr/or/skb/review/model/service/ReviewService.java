package kr.or.skb.review.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.skb.review.model.dao.ReviewDao;
import kr.or.skb.review.model.vo.Review;

@Service
public class ReviewService {
	@Autowired
	private ReviewDao reviewDao;

	public int insertReview(Review r) {
		return reviewDao.insertReview(r);
	}
}
