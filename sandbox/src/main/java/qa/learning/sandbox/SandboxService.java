package qa.learning.sandbox;

import jakarta.persistence.Tuple;
import jakarta.persistence.TupleElement;
import net.sf.jsqlparser.JSQLParserException;
import net.sf.jsqlparser.parser.CCJSqlParserUtil;
import net.sf.jsqlparser.statement.Statement;
import net.sf.jsqlparser.statement.select.PlainSelect;
import net.sf.jsqlparser.util.validation.Validation;
import net.sf.jsqlparser.util.validation.ValidationError;
import net.sf.jsqlparser.util.validation.feature.DatabaseType;
import net.sf.jsqlparser.util.validation.feature.FeaturesAllowed;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import qa.learning.sandbox.dao.SandboxDao;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Stream;

@Service
public class SandboxService {
    private final SandboxDao sandboxDao;

    @Autowired
    public SandboxService(SandboxDao sandboxDao)
    {
        this.sandboxDao = sandboxDao;
    }

    public List<List<String>> getRawSqlResults(String sql) throws JSQLParserException
    {
        List<List<String>> resultList = new ArrayList<>();
        List<Tuple> resultTupleList = sandboxDao.executeRawSQL(sql);
        if (resultTupleList.isEmpty()) {
            return resultList;
        }
        Statement parse = CCJSqlParserUtil.parse(sql);
        if (((PlainSelect) parse).getSelectItems().stream().noneMatch(i -> "*".equals(i.getExpression().toString()))) {
            List<String> headers = resultTupleList.get(0).getElements().stream().map(TupleElement::getAlias).toList();
            resultList.add(headers);
        }
        for (Tuple tuple : resultTupleList) {
            List<String> row = Stream.of(tuple.toArray()).map(Object::toString).toList();
            resultList.add(row);
        }

        return resultList;
    }
}
