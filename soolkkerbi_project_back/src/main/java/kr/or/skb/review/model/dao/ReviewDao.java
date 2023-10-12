package kr.or.skb.review.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.skb.review.model.vo.Review;
import kr.or.skb.review.model.vo.ReviewData;

@Mapper
public interface ReviewDao {

	int insertReview(Review r);

	int totalCount(String memberId);

	List selectMyReviewList(ReviewData rd);
	
}
