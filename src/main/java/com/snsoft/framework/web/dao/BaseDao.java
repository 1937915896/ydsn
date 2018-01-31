package com.snsoft.framework.web.dao;

import java.util.List;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;

/**
 * 
 * 
 * @copyright ：神农大学生软件创新中心 版权所有 (c) 2016
 * 
 * @author Mr. Soldier
 * 
 * @version 1.0
 * 
 * @date 2016年9月4日 上午11:31:58
 * 
 * @Description TODO
 *  MyBatis 的dao工具
 */
@Repository
public class BaseDao {

	@Resource
	private SqlSessionFactory  sqlSessionFactory; 
	/**
	 * 查询一个结果集
	 * @param statemanet
	 * @param parameter
	 * @return
	 */
	public <T> List<T> queryForListBySql(String statement, Object parameter){
		
		SqlSession session = sqlSessionFactory.openSession();
		try{
			return session.selectList(statement, parameter);
		} finally {
			session.close();
		}
	}
	
	/**
	 * 查询单个结果
	 * @param statement
	 * @param parameter
	 * @return
	 */
	public <T> T queryForObjectBySql(String statement, Object parameter){
		
		SqlSession session = sqlSessionFactory.openSession();
		try{
			return session.selectOne(statement, parameter);
		} finally {
			session.close();
		}
	}
	
	/**
	 * 插入数据
	 * @param statement
	 * @param parameter
	 */
	public void insertBySql(String statement, Object parameter){
		SqlSession session = sqlSessionFactory.openSession();
		try{
			session.insert(statement, parameter);
			session.commit();
		} finally {
			session.close();
		}
	}
	
	/**
	 * 删除
	 * @param statement
	 * @param parameter
	 */
	public void deleteBySql(String statement, Object parameter){
		SqlSession session = sqlSessionFactory.openSession();
		try{
			session.delete(statement, parameter);
			session.commit();
		} finally {
			session.close();
		}
	}
	
	/**
	 * 更新
	 * @param statement
	 * @param parameter
	 */
	public void updateBySql(String statement, Object parameter){
		SqlSession session = sqlSessionFactory.openSession();
		try{
			session.update(statement, parameter);
			session.commit();
		} finally {
			session.close();
		}
	}
}
