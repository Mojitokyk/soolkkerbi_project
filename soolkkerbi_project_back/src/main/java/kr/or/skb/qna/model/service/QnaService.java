package kr.or.skb.qna.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.skb.PageInfo;
import kr.or.skb.Pagination;
import kr.or.skb.qna.model.dao.QnaDao;

@Service
public class QnaService {
	@Autowired
	private QnaDao qnaDao;
	@Autowired
	private Pagination pagination;
	
	//게시물 조회
	public Map qnaList(int reqPage) {
		//게시물 조회, 페이징에 필요한 데이터를 취합
		int numPerPage = 10; //한 페이지당 게시물 수
		int pageNaviSize = 5; //페이지 네비게이션에 표시되는 개수(길이)
		int totalCount = qnaDao.totalCount(); //전체 게시물 수
		
		//페이징 조회 및 페이지네비 제작에 필요한 데이터를 객체로 받아옴
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		
		List qnaList = qnaDao.selectQnaList(pi); //pi로 start, end값을 mybatis로 넘김
		
		//pi와 boardList를 반환해야하나, 1개만 	반환할 수 있다.
		//방법1. VO 제작
		//방법2. Map(HashMap) 사용
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("qnaList", qnaList);
		map.put("pi", pi);
		
		return map;
	}
}
