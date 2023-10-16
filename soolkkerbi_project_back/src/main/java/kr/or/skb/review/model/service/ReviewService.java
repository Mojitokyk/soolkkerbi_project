package kr.or.skb.review.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.skb.PageInfo;
import kr.or.skb.Pagination;
import kr.or.skb.review.model.dao.ReviewDao;
import kr.or.skb.review.model.vo.Review;
import kr.or.skb.review.model.vo.ReviewData;
import kr.or.skb.review.model.vo.ReviewListData;

@Service
public class ReviewService {
	@Autowired
	private ReviewDao reviewDao;
	@Autowired
	private Pagination pagination;
	

	@Transactional
	public int insertReview(Review r) {
		return reviewDao.insertReview(r);
	}

	public Map reviewList(int reqPage, String memberId) {
		int totalCount = reviewDao.totalCount(memberId);
		System.out.println(totalCount);
		int numPerPage = 5;
		int pageNaviSize = 5;
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		int start = pi.getStart();
		int end = pi.getEnd();
		ReviewData rd = new ReviewData(start, end, memberId);
		List reviewList = reviewDao.selectMyReviewList(rd);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("list", reviewList);
		map.put("pi", pi);
		return map;
	}

	public Map productReviewList(int reqPage, int productNo) {
		int totalCount = reviewDao.totalCount2(productNo);
		int numPerPage = 5;
		int pageNaviSize = 5;
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		int start = pi.getStart();
		int end = pi.getEnd();
		ReviewListData rld = new ReviewListData(start, end, productNo);
		List list = reviewDao.selectProductReview(rld);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("list", list);
		map.put("pi", pi);
		return map;
	}
	public int reviewCount(int productNo) {
		return reviewDao.reviewCount(productNo);
	}

	@Transactional
	public int updateCount(int reviewNo) {
		return reviewDao.updateCount(reviewNo);
	}

	public Map readAllReview(int reqPage) {
		int totalCount = reviewDao.totalCount3(reqPage);
		int numPerPage = 10;
		int pageNaviSize = 5;
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List reviewList = reviewDao.selectAllReview(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("list", reviewList);
		map.put("pi", pi);
		return map;
	}

}
