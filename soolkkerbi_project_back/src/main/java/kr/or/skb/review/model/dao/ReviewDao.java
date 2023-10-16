package kr.or.skb.review.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.skb.PageInfo;
import kr.or.skb.review.model.vo.Review;
import kr.or.skb.review.model.vo.ReviewData;
import kr.or.skb.review.model.vo.ReviewListData;

@Mapper
public interface ReviewDao {

	int insertReview(Review r);

	int totalCount(String memberId);

	List selectMyReviewList(ReviewData rd);

	int totalCount2(int productNo);

	List selectProductReview(ReviewListData rld);

	int updateCount(int reviewNo);

	int reviewCount(int productNo);

	int totalCount3(int reqPage);

	List selectAllReview(PageInfo pi);
	
}
