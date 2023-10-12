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
}
