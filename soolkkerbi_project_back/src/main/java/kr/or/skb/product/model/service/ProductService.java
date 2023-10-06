package kr.or.skb.product.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.skb.PageInfo;
import kr.or.skb.Pagination;
import kr.or.skb.member.model.dao.MemberDao;
import kr.or.skb.member.model.vo.Member;
import kr.or.skb.product.model.dao.ProductDao;
import kr.or.skb.product.model.vo.Product;
import kr.or.skb.product.model.vo.ProductListData;

@Service
public class ProductService {
	@Autowired
	private ProductDao productDao;
	@Autowired
	private MemberDao memberDao;
	@Autowired
	private Pagination pagination;

	public Map readAllProduct(int reqPage) {
		int totalCount = productDao.totalCount();
		int numPerPage = 10;
		int pageNaviSize = 5;
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List productList = productDao.selectAllProduct(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("list", productList);
		map.put("pi", pi);
		return map;
	}

	@Transactional
	public int updateStock(Product p) {
		return productDao.updateStock(p);
	}
	
	@Transactional
	public int insertProduct(Product p) {
		return productDao.insertProduct(p);
	}

	public Map takjuList(int reqPage, String memberId) {
		int numPerPage = 12;
		int pageNaviSize = 5;	
		int totalCount = productDao.totalCount();
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		int start = pi.getStart();
		int end = pi.getEnd();
		ProductListData pld = new ProductListData(memberId, start, end);
		List takjuList = productDao.selectTakjuList(pld);
		Member member = memberDao.selectOneMember(memberId);
		HashMap<String, Object> map = new HashMap <String, Object>();
		map.put("takjuList", takjuList);
		map.put("pi", pi);
		map.put("member", member);
		return map;
	}
	
	public Map yakjuList(int reqPage, String memberId) {
		int numPerPage = 12;
		int pageNaviSize = 5;	
		int totalCount = productDao.totalCount();
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		int start = pi.getStart();
		int end = pi.getEnd();
		ProductListData pld = new ProductListData(memberId, start, end);
		List yakjuList = productDao.selectYakjuList(pld);
		Member member = memberDao.selectOneMember(memberId);
		HashMap<String, Object> map = new HashMap <String, Object>();
		map.put("yakjuList", yakjuList);
		map.put("pi", pi);
		map.put("member", member);
		return map;
	}

	public Map fruitList(int reqPage, String memberId) {
		int numPerPage = 12;
		int pageNaviSize = 5;	
		int totalCount = productDao.totalCount();
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		int start = pi.getStart();
		int end = pi.getEnd();
		ProductListData pld = new ProductListData(memberId, start, end);
		List fruitList = productDao.selectFruitList(pld);
		Member member = memberDao.selectOneMember(memberId);
		HashMap<String, Object> map = new HashMap <String, Object>();
		map.put("fruitList", fruitList);
		map.put("pi", pi);
		map.put("member", member);
		return map;
	}

	public Map spiritsList(int reqPage, String memberId) {
		int numPerPage = 12;
		int pageNaviSize = 5;	
		int totalCount = productDao.totalCount();
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		int start = pi.getStart();
		int end = pi.getEnd();
		ProductListData pld = new ProductListData(memberId, start, end);
		List spiritsList = productDao.selectSpiritsList(pld);
		Member member = memberDao.selectOneMember(memberId);
		HashMap<String, Object> map = new HashMap <String, Object>();
		map.put("spiritsList", spiritsList);
		map.put("pi", pi);
		map.put("member", member);
		return map;
	}
	
	@Transactional
	public int insertLike(Product p) {
		return productDao.insertLike(p);
	}
	
	@Transactional
	public int deleteLike(Product p) {
		return productDao.deleteLike(p);
	}

	public Product selectOneProduct(int productNo) {
		return productDao.selectOneProduct(productNo);
	}
	/*
	@Transactional
	public int selectLike(Product p) {
		//저장했는지 조회
		int save = productDao.selectLike(p);
		if(save == 0) {
			//저장내역이 없으면 insert
			int result = productDao.insertLike(p);
			if(result>0) {
				return 1;				
			}
		}else if(save == 1){
			//저장내역이 있으면 delete
			int result = productDao.deleteLike(p);
			if(result>0) {
				return 2;				
			}
		}
		return 0;
	}
	*/
}
