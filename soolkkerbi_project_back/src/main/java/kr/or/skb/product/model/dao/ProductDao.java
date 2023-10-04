package kr.or.skb.product.model.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.or.skb.PageInfo;
import kr.or.skb.pay.model.vo.Pay;
import kr.or.skb.product.model.vo.Product;

@Mapper
public interface ProductDao {

	int totalCount();

	List selectAllProduct(PageInfo pi);

	int updateStock(Product p);

	int insertProduct(Product p);

	List selectTakjuList(PageInfo pi);

	List selectYakjuList(PageInfo pi);

	List selectFruitList(PageInfo pi);

	List selectSpiritsList(PageInfo pi);

	int insertLike(Product p);

	int deleteLike(Product p);

	int updatePayStock(Pay pay);
	
}
