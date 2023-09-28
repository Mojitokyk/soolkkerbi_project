package kr.or.skb.product.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.or.skb.PageInfo;
import kr.or.skb.Pagination;
import kr.or.skb.product.model.dao.ProductDao;

@Service
public class ProductService {
	@Autowired
	private ProductDao productDao;
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
}
