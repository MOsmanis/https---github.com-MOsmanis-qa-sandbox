package qa.learning.sandbox;

import jakarta.persistence.Tuple;
import jakarta.persistence.TupleElement;
import jakarta.transaction.Transactional;
import net.sf.jsqlparser.JSQLParserException;
import net.sf.jsqlparser.parser.CCJSqlParserUtil;
import net.sf.jsqlparser.statement.Statement;
import net.sf.jsqlparser.statement.insert.Insert;
import net.sf.jsqlparser.statement.select.PlainSelect;
import net.sf.jsqlparser.statement.select.Select;
import net.sf.jsqlparser.statement.update.Update;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import qa.learning.sandbox.dao.SandboxDao;

import java.util.ArrayList;
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

    @Transactional
    public List<List<String>> getRawSqlResults(String sql) throws JSQLParserException
    {
        Statement parse = CCJSqlParserUtil.parse(sql);
        return switch(parse) {
            case Update u -> List.of(List.of("Rows updated:", String.valueOf(sandboxDao.executeRawUpdate(sql))));
            case Insert i -> List.of(List.of("Rows added:", String.valueOf(sandboxDao.executeRawUpdate(sql))));
            case Select s -> getResultsForSelect(sql, (PlainSelect) parse);
            default -> List.of(List.of("Query type not allowed"));
        };
    }

    private List<List<String>> getResultsForSelect(String sql, PlainSelect parse)
    {
        List<List<String>> resultList = new ArrayList<>();
        List<Tuple> resultTupleList = sandboxDao.executeRawSelect(sql);
        if (resultTupleList.isEmpty()) {
            return resultList;
        }

        if (parse.getSelectItems().stream().noneMatch(i -> "*".equals(i.getExpression().toString()))) {
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
