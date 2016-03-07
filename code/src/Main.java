import java.io.IOException;

import code.SKIP2json;

/**
 * @author iampkuhz
 * Mar 27, 2015
 *
 */

public class Main {

	public static void main(String [] args) throws IOException
	{
		GenerateSKipJSON();
	}

	private static void GenerateSKipJSON() throws IOException {
		// TODO Auto-generated method stub
		SKIP2json one = new SKIP2json("data/SKIPList");
		one.convert2Json("data/SKIPList.json");
	}
}
