package kr.or.skb.pay.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import kr.or.skb.PageInfo;
import kr.or.skb.Pagination;
import kr.or.skb.SelectDate;
import kr.or.skb.cart.model.vo.Cart;
import kr.or.skb.pay.model.dao.PayDao;
import kr.or.skb.pay.model.vo.Pay;
import kr.or.skb.pay.model.vo.PayListData;
import kr.or.skb.product.model.dao.ProductDao;

@Service
public class PayService {
	@Autowired
	private PayDao payDao;
	@Autowired
	private Pagination pagination;
	@Autowired
	private ProductDao productDao;
	
	public Map readAllCancelPay(int reqPage) {
		int totalCount = payDao.totalCount();
		int numPerPage = 10;
		int pageNaviSize = 5;
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List payList = payDao.selectAllCancelPay(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("list", payList);
		map.put("pi", pi);
		return map;
	}

	@Transactional
	public int updatePayStatus(Pay pay) {
		int result1 = payDao.updatePayStatus(pay);
		int result2 = productDao.updatePayStock(pay);
		int result = result1 + result2;
		return result;
	}

	public Map readAllSuccessPay(int reqPage) {
		int totalCount = payDao.totalCount2();
		int numPerPage = 10;
		int pageNaviSize = 5;
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		List payList = payDao.selectAllSuccessPay(pi);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("list", payList);
		map.put("pi", pi);
		return map;
	}

	@Transactional
	public int confirmIncome(Pay pay) {
		return payDao.confirmIncome(pay);
	}

	//마이페이지 주문내역 전부 조회하기
	public Map readOrderList(int reqPage, String memberId) {
		int totalCount = payDao.totalCount3(memberId);
		System.out.println("totalCount : " + totalCount);
		int numPerPage = 5;
		int pageNaviSize = 5;
		PageInfo pi = pagination.getPageInfo(reqPage, numPerPage, pageNaviSize, totalCount);
		int start = pi.getStart();
		int end = pi.getEnd();
		PayListData pld = new PayListData(start, end, memberId);
		List orderList = payDao.selectMyOrderList(pld);
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("list",orderList);
		map.put("pi", pi);
		return map;
	}

	public Map readAllIncome(SelectDate selectDate) {
		HashMap<String, Object> map = new HashMap<String, Object>();
		return null;
	}
	
	@Transactional
	public int insertOnePay(Cart cart) {
		int result = 0;
		result += payDao.insertOnePay(cart);
		result += payDao.updateProductStock(cart);
		result += payDao.deleteCart(cart);
		return 1;
		/* 장바구니에 안 담고 바로 구매 가능
		if(result == 3) {
			return 1;
		}else {
			return 0;			
		}
		*/
	}
	@Transactional
	public int insertPayList(List<Cart> cartList, String memberId) {
		int result = 0;
		for(Cart cart : cartList) {
			cart.setMemberId(memberId);
			result += payDao.insertOnePay(cart);
			result += payDao.updateProductStock(cart);
			result += payDao.deleteCart(cart);
		}
		return 1;
		/* 장바구니에 안 담고 바로 구매 가능
		if(result == cartList.size()*3) {
			return 1;
		}else {
			return 0;			
		}
		*/
	}
}
