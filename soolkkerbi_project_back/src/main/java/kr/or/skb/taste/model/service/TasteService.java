package kr.or.skb.taste.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.skb.PageInfo;
import kr.or.skb.Pagination;
import kr.or.skb.member.model.dao.MemberDao;
import kr.or.skb.taste.model.dao.TasteDao;
import kr.or.skb.taste.model.vo.Taste;

@Service
public class TasteService {

	@Autowired
	private TasteDao tasteDao;
	@Autowired
	private Pagination pagination;
	@Autowired private MemberDao memberDao;
	
	public Map partyList(int reqPage) {
		// 게시물조회 ,페이징에 필요한 데이터를 취합
		int numPerPage = 12; //한페이지당 게시물수
		int pageNaviSize = 5; //페이지 네비게이션 길이
		int totalCount = tasteDao.totalCount();
		//페이징 조회 및페이지 제작에 필요한 데이터를 객체롤 받아옴
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
				List tasteList = tasteDao.selectPartyList(pi);
	    HashMap<String, Object> map = new HashMap<String, Object>();
	    map.put("tasteList", tasteList);
	    map.put("pi",pi);
	    return map;
		
	}
	public Taste selectOneBoard(int tasteNo) {
		Taste b = tasteDao.selectOneBoard(tasteNo);
		return b;
	}
	
}
