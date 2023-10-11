package kr.or.skb.review.model.dao;

import org.apache.ibatis.annotations.Mapper;

import kr.or.skb.review.model.vo.Review;

@Mapper
public interface ReviewDao {

	int insertReview(Review r);
	
}
