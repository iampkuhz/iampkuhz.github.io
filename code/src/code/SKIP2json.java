/**
 * @author iampkuhz
 * Mar 27, 2015
 *
 */
package code;

import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.Writer;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import com.hz.uFunc;

public class SKIP2json {
	private String srcPath;

	public SKIP2json(String srcFile)
	{
		srcPath = srcFile;
	}
	
	public void convert2Json(String outPath) throws IOException
	{
		JSONObject jo = new JSONObject();
		AddCharts(jo);
		
		AddCategories(jo);
		
		JSONArray data = new JSONArray();
		AddAmount(data);
		AddFastThousand(data);
		AddAvgThousand(data);
		jo.put("dataset", data);
		
		uFunc.deleteFile(outPath);
		uFunc.addFile(jo.toJSONString(), outPath);
		
		uFunc.deleteFile(outPath + "1");
		Writer out = new OutputStreamWriter(new FileOutputStream(outPath+"1",true),"utf-8");;
		jo.writeJSONString(out);
		out.close();
	}

	private void AddAvgThousand(JSONArray data) throws NumberFormatException, IOException {
		// TODO Auto-generated method stub
		BufferedReader br = uFunc.getBufferedReader(srcPath);
		String oneLine = "";
		JSONArray lists = new JSONArray();
		
		JSONObject ds = new JSONObject();
		JSONArray list = new JSONArray();
		while((oneLine = br.readLine()) != null)
		{
			String [] ss = oneLine.split("\t");
			int min = 0;
			for(int i = 2; i < ss.length; i ++)
			{
				int s = Integer.parseInt(ss[i].substring(0, ss[i].indexOf("'"))) * 60 + Integer.parseInt(ss[i].substring(ss[i].indexOf("'") + 1, ss[i].indexOf("\"")));
				min += s;
			}
			
			min /= (ss.length - 2);
			
			JSONObject node = new JSONObject();
			node.put("value", (min/60) + "." + (min%60)*100/60);
			list.add(node);
		}
		ds.put("parentyaxis", "S");
		ds.put("seriesname", "avg");
		ds.put("renderas", "Line");
		ds.put("data", list);
		data.add(ds);
		
	}

	private void AddFastThousand(JSONArray data) throws NumberFormatException, IOException {
		BufferedReader br = uFunc.getBufferedReader(srcPath);
		String oneLine = "";
		JSONArray lists = new JSONArray();
		
		JSONObject ds = new JSONObject();
		JSONArray list = new JSONArray();
		while((oneLine = br.readLine()) != null)
		{
			String [] ss = oneLine.split("\t");
			int min = 1000000;
			for(int i = 2; i < ss.length; i ++)
			{
				int s = Integer.parseInt(ss[i].substring(0, ss[i].indexOf("'"))) * 60 + Integer.parseInt(ss[i].substring(ss[i].indexOf("'") + 1, ss[i].indexOf("\"")));
				min = min > s ? s : min;
			}
			JSONObject node = new JSONObject();
			node.put("value", (min/60) + "." + (min%60)*100/60);
			list.add(node);
		}
		ds.put("parentyaxis", "S");
		ds.put("seriesname", "fast");
		ds.put("renderas", "Line");
		ds.put("data", list);
		data.add(ds);
	}

	private void AddAmount(JSONArray data) throws IOException {
		// TODO Auto-generated method stub

		BufferedReader br = uFunc.getBufferedReader(srcPath);
		String oneLine = "";
		JSONArray lists = new JSONArray();
		
		JSONObject ds = new JSONObject();
		JSONArray list = new JSONArray();
		while((oneLine = br.readLine()) != null)
		{
			double dc = Double.parseDouble(oneLine.split("\t")[0]);
			int amount = (int)(dc* 1000);
			JSONObject node = new JSONObject();
			node.put("value", amount);
			list.add(node);
		}
		
		ds.put("seriesname", "quantity");
		ds.put("data", list);
		data.add(ds);
	}

	private void AddCharts(JSONObject jo) {
		// TODO Auto-generated method stub
		JSONObject charts = new JSONObject();
		charts.put("caption", "March Skip");
		charts.put("bgcolor", "FFFFFF");
		//charts.put("plotgradientcolor", "");
		//charts.put("showalternatehgridcolor", "0");
		//charts.put("showplotborder", "0");
		//charts.put("divlinecolor", "CCCCCC");
		charts.put("showvalues", "0");
		charts.put("showcanvasborder", "0");
		charts.put("pyaxisname", "数量");
		charts.put("syaxisname", "用时（每1000个）");
		charts.put("numberprefix", "");
		charts.put("labeldisplay", "STAGGER");
		charts.put("slantlabels", "1");
		charts.put("canvasborderalpha", "0");
		charts.put("legendshadow", "0");
		charts.put("legendborderalpha", "0");
		charts.put("setadaptiveymin", "1");
		charts.put("setadaptivesymin", "0");
		charts.put("linethickness", "1");
		charts.put("showborder", "0");
		
		jo.put("chart", charts);
	}
	
	private void AddCategories(JSONObject jo) throws IOException {
		// TODO Auto-generated method stub
		BufferedReader br = uFunc.getBufferedReader(srcPath);
		String oneLine = "";
		JSONArray lists = new JSONArray();
		
		JSONObject category = new JSONObject();
		JSONArray list = new JSONArray();
		while((oneLine = br.readLine()) != null)
		{
			String date = oneLine.split("\t")[1];
			JSONObject node = new JSONObject();
			node.put("label", date.substring(2));
			list.add(node);
		}
		
		category.put("category", list);
		
		lists.add(category);
		jo.put("categories", lists);
	}
}
